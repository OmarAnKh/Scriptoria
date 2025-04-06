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
import repliesRouter from "./routers/replies.js"
import cors from "cors"
import cookieParser from "cookie-parser"

import { findDocument, applyChangesAndBroadcast } from "./routers/io.js";
import Story from "./models/story.js";

const app = express()
const server = http.createServer(app); // Create a server instance
const io = new Server(server, {
    cors: {
        origin: process.env.REACT_URL,
        methods: ["GET", "POST"],
    }
});

const port = process.env.PORT

app.use(cors({
    origin: process.env.REACT_URL,
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
app.use(repliesRouter)

server.listen(port, '0.0.0.0', () => {
    console.log('run on port ' + port)
});

const users = {}
const rooms = {}
// Socket.io connection logic

io.on("connection", (socket) => {

    socket.on('joinRoom', (room) => {
        if (room && room._id) {
            socket.join(room._id);
            if (!rooms[room._id]) {
                rooms[room._id] = { ...room, messages: [] };
            }
            socket.emit('getOldMessages', rooms[room._id].messages);
        } else {
            console.log('Room object is null or undefined');
        }
    });

    socket.on('newRoom', (room) => {
        if (!rooms[room._id]) {
            rooms[room._id] = { ...room, messages: [] };
            io.emit('update', room);
        }
    });

    socket.on('sendMessage', (message) => {
        io.to(message.roomId).emit('message', message)
        socket.broadcast.to(message.roomId).emit('sendNotification', message)
        if (rooms[message.roomId]) {
            rooms[message.roomId].messages.push(message)
        } else {
            console.log(rooms)
            console.log(`room ${message.roomId} does not exist.`);
        }
    })


    socket.on('deleteRoom', (room) => {
        if (rooms[room._id]) {
            delete rooms[room._id];
            io.emit('roomDeleted', room);
            io.to(room._id).emit('update', room)
        } else {
            console.log("Room not found");
        }
    })


    socket.on('updateChats', (room) => {
        rooms[room._id] = { ...room, messages: [...rooms[room._id].messages] }
        if (rooms[room._id]) {
            io.to(room._id).emit('update', room)
        }
    })


    socket.on('leaveGroup', ({ room, user, type }) => {
        const isMember = rooms[room._id] && rooms[room._id].users.find((member) => member.user === user.user._id)
        if (isMember) {
            rooms[room._id] = { ...room, messages: [...rooms[room._id].messages] }
            io.to(room._id).emit('leftGroup', { room, user, type })
            io.to(room._id).emit('update', room)
        }
    })


    socket.on("joinWritingPage", (user) => {
        users[user] = socket.id
    })


    socket.on("get-document", async documentId => {
        const document = await findDocument(documentId);
        if (!document) {
            return socket.emit("load-document", null);
        }

        socket.join(documentId);
        socket.emit("load-document", document.slides);

        socket.on("send-changes", async ({ text, roomId, index }) => {
            try {
                const document = await Story.findById(documentId);
                if (!document) {
                    return;
                }
                document.slides[index].text = text;
                await document.save();
                socket.broadcast.to(roomId).emit("receive-changes", { text, roomId, idx: index });
            } catch (error) {
                console.log(error);
            }
        });

        socket.on("save-document", async ({ text, index }) => {
            try {
                const document = await Story.findById(documentId);
                if (!document) {
                    return;
                }
                document.slides[index].text = text;
                await document.save();
            } catch (error) {
                console.log(error);
            }
        });

        socket.on("add-slide", (slide) => {
            io.to(documentId).emit("get-add-slide", slide)
        })

        socket.on("delete-slide", (slide) => {
            io.to(documentId).emit("get-slide-after-delete", slide)
        })

        socket.on("join-slide-room", roomId => {
            socket.join(roomId);
        })
    });

    socket.on("remove-user", (userId) => {
        const targetSocket = io.sockets.sockets.get(users[userId]);
        targetSocket?.emit("navigate")
    })

    socket.on("rule-change", ({ userId, rule }) => {
        const targetSocket = io.sockets.sockets.get(users[userId]);
        targetSocket?.emit("changed", rule)
    })
});
