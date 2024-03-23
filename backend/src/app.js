import express from "express";
import "./DB/mongoose.js";
import userRouter from "./routers/account.js"
import cors from "cors"
const app = express()

const port = process.env.PORT

app.use(cors());
app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log('run on port ' + port)
})