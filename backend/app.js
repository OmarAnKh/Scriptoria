import express from "express";
import "./src/DB/mongoose.js";
import userRouter from "./src/routers/account.js"

import cors from "cors"
const app = express()

const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log('run on port ' + port)
})