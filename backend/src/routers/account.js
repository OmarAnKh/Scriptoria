import express from "express";
import Account from "../models/account.js"
import sendMail from "../emails/sendMail.js"
import authentication from "../middleware/authentication.js";
import axios from "axios";
import sharp from "sharp";

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
router.get('/find/userName/:userName', async (req, res) => {
    try {
        const user = await Account.findOne({ userName: req.params.userName })
        if (!user) {
            return res.status(404).send({ error: "Username not found" })
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post("/user/find", async (req, res) => {
    try {
        const user = await Account.findOne(req.body);
        if (!user) {
            return res.send({ message: false });
        }
        res.send({ message: true, _id: user._id, user });
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

router.get('/find/email/:email', async (req, res) => {
    try {
        const user = await Account.findOne({ email: req.params.email })
        if (!user) {
            return res.status(404).send({ error: "Email not found" })
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
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

router.patch('/reset/password', async (req, res) => {
    try {

        const user = await Account.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).send("User not found");
        }

        user.password = req.body.password
        await user.save()

        res.status(200).send({ status: true })
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: false })
    }
})
router.post("/account/logout", authentication, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
        await req.user.save();
        res.send({ status: true });
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch("/account/update", async (req, res) => {
    const _id = req.body._id;
    delete req.body._id;
    const updates = Object.keys(req.body);
    try {
        if (updates[0] === "profilePicture") {
            try {
                const imageURL = req.body.profilePicture;
                const imageResponse = await axios.get(imageURL, {
                    responseType: "arraybuffer",
                });
                if (!imageResponse.data) {
                    throw new Error("Image data not found in the response");
                }
                const buffer = await sharp(imageResponse.data)
                    .resize({ width: 250, height: 250 })
                    .png()
                    .toBuffer();
                req.body.profilePicture = buffer;
            } catch (error) {
                console.error("Error fetching or processing image:", error);
            }
        }

        const user = await Account.findById(_id);
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        if (!user) {
            return res.status(404).send({ error: "Not Found" });
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

export default router
