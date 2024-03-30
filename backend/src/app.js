import express from "express";
import "./DB/mongoose.js";
import userRouter from "./routers/account.js"
import storyRouter from "./routers/story.js"
import followRouter from "./routers/follow.js"
import blockRouter from "./routers/block.js"
import cors from "cors"

const app = express()

const port = process.env.PORT

app.use(cors());
app.use(express.json())
app.use(userRouter)
app.use(storyRouter)
app.use(followRouter)
app.use(blockRouter)
app.listen(port, () => {
    console.log('run on port ' + port)
})