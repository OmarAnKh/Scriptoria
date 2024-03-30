import express from "express";
import Follow from "../models/follow.js";
const router = express.Router();

router.post("/follow", async (req, res) => {
    const newFollow = new Follow(req.body);

    try {
        await newFollow.save();
        res.status(201).send({ status: true })
    } catch (error) {
        res.status(400).send({ error: "cant follow" });
    }
})

router.get("/following/:user/:follow", async (req, res) => {

    try {
        const user = await Follow.findOne({ account: req.params.user, follow: req.params.follow })
        if (user) {
            return res.status(200).send({ status: true })
        }
        return res.status(200).send({ status: false })
    } catch (error) {
        return res.status(500).send({ status: error })
    }
})

router.delete("/unfollow", async (req, res) => {

    try {
        const user = await Follow.findOneAndDelete({ account: req.body.account, follow: req.body.follow })

        if (user) {
            return res.status(200).send({ status: true })
        }
        return res.status(400).send({ status: false })
    } catch (error) {
        return res.status(500).send({ status: error })
    }
})
export default router;