import express from "express";
import Account from "../models/account.js"
const router = new express.Router()


router.post('/signIn', async (req, res) => {
    try {
        const user = await Account.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({ user, token })
    } catch (error) {
        console.log(20)
        res.status(400).send()
    }
})


export default router
