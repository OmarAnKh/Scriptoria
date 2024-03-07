import express from "express";
import "./src/DB/mongoose.js";
import userRouter from "./src/routers/account.js"

const app = express()

const port = process.env.PORT || 5000


app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log('run on port ' + port)
})