import express from "express";
import "./src/DB/mongoose.js";
import userRouter from "./src/routers/account.js"
import storyRouter from "./src/routers/story.js"
import cors from "cors"

const app = express()

const port = process.env.PORT

app.use(cors());
app.use(express.json())
app.use(userRouter)
app.use(storyRouter)

app.listen(port, () => {
    console.log('run on port ' + port)
})