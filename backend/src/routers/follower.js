import express from "express";
import Follow from "../models/follow";
const router = express.Router();

router.post("/follow", async (req, res) => {
    const newFollow = new Follow({
        account: req.body.accountId,
        follow_id: req.body.followId
    });
    try {
        await newFollow.save();
        res.status(201).send()
    } catch (error) {
        res.status(400).send(error);
    }
})

export default router;