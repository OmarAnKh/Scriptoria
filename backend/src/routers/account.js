import express from "express";
import Account from "../models/account.js"
import sendMail from "../emails/sendMail.js";

const router = new express.Router()

router.post("/SignUp", async (req, res) => {
    const user = new Account(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/signIn', async (req, res) => {
    try {
        const user = await Account.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({ user, token })
    } catch (error) {
        res.status(400).send()
    }
})

router.post("/user/find", async (req, res) => {
    try {
        const user = await Account.findOne(req.body);
        if (!user) {
            return res.send({ message: false });
        }
        res.send({ message: true });
    } catch (error) {
        res.status(500).send({ error: "Server error" })
    }
})

router.post('/account/recovery', async (req, res) => {
    try {
        sendMail(req.body.email, req.body.codeGenerated)
        res.status(200).send({ status: true })
    } catch (error) {
        res.status(500).send({ status: false })
    }
})


export default router
