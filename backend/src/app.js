import express from "express";
import "./DB/mongoose.js";
import userRouter from "./routers/account.js"
import storyRouter from "./routers/story.js"
import followRouter from "./routers/follow.js"
import blockRouter from "./routers/block.js"
import ratingRouter from "./routers/rating.js"
import commentsRouter from "./routers/comments.js"
import listsRouter from "./routers/readingList.js"
import writersRouter from "./routers/writers.js"
import cors from "cors"

const app = express()

const port = process.env.PORT

app.use(cors());
app.use(express.json())
app.use(userRouter)
app.use(storyRouter)
app.use(followRouter)
app.use(blockRouter)
app.use(ratingRouter)
app.use(commentsRouter)
app.use(listsRouter)
app.use(writersRouter)

app.listen(port, () => {
    console.log('run on port ' + port)
})