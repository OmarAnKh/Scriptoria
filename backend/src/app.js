import express from "express";
import http from "http"; // Import http module
import { Server } from "socket.io"; // Import Server class from socket.io
import "./DB/mongoose.js";
import userRouter from "./routers/account.js"
import storyRouter from "./routers/story.js"
import followRouter from "./routers/follow.js"
import blockRouter from "./routers/block.js"
import ratingRouter from "./routers/rating.js"
import commentsRouter from "./routers/comments.js"
import listsRouter from "./routers/readingList.js"
import likesRouter from "./routers/likes.js"
import writersRouter from "./routers/writers.js"
import roomRouter from "./routers/room.js"
import cors from "cors"
import cookieParser from "cookie-parser"

import { findDocument, applyChangesAndBroadcast } from "./routers/io.js";
import Story from "./models/story.js";

const app = express()
const server = http.createServer(app); // Create a server instance
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

const port = process.env.PORT

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express.json())
app.use(cookieParser())

app.use(userRouter)
app.use(storyRouter)
app.use(followRouter)
app.use(blockRouter)
app.use(ratingRouter)
app.use(commentsRouter)
app.use(listsRouter)
app.use(likesRouter)
app.use(writersRouter)
app.use(roomRouter)

server.listen(port, () => {
    console.log('run on port ' + port)
});

const users = {}
const rooms = {}
// Socket.io connection logic

io.on("connection", (socket) => {

    socket.on('joinRoom', (room) => {
        socket.join(room._id); 
        if(!rooms[room._id]){
            rooms[room._id] = {...room, messages : []}
        }

        socket.emit('getOldMessages', rooms[room._id].messages)
      });

      socket.on('sendMessage', (message)=>{
        io.to(message.roomId).emit('message', message)
        if (rooms[message.roomId]) {
            rooms[message.roomId].messages.push(message)
        } else {
            console.error(`room ${message.roomId} does not exist.`);
        }
    })

    socket.on('deleteRoom', (roomId)=>{
        const room = rooms[roomId];
        delete rooms[roomId];
        io.emit('roomDeleted', roomId); 
    })

    socket.on('leaveGroup', ({roomId, userId})=>{
        const user = rooms[roomId].users.find((user)=> user.user._id===userId)
        if(user){
            io.to(rooms[roomId]).emit('leftGroup',`${user.user.userName} had left the group`)
            rooms[roomId].users = rooms[roomId].users.filter((user=>user.user._id===userId))
        }
    })

    socket.on('updateChats', (room)=>{
        const currentRoom = rooms[room.id]
        console.log(rooms,room)
        if(currentRoom){

            io.to(currentRoom._id).emit('update', room)
        }
    })




    socket.on("joinWritingPage", (user) => {
        users[user] = socket.id
    })
    

    socket.on("get-document", async documentId => {
        const document = await findDocument(documentId);
        socket.join(documentId);
        socket.emit("load-document", document.slide);

        socket.on("send-changes", async delta => {
            applyChangesAndBroadcast(socket, documentId, delta);
        });

        socket.on("save-document", async data => {
            await Story.findByIdAndUpdate(documentId, { slide: data });
        });
    });

    socket.on("remove-user", (userId) => {
        const targetSocket = io.sockets.sockets.get(users[userId]);
        targetSocket?.emit("navigate")
    })

    socket.on("rule-change", ({ userId, rule}) => {
        const targetSocket = io.sockets.sockets.get(users[userId]);
        targetSocket?.emit("changed", rule)
    })
});
