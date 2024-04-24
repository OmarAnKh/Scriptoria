import express from "express";
import Block from "../models/block.js";
const router = express.Router();

router.post("/block", async (req, res) => {
    const newBlock = new Block(req.body);
    try {
        await newBlock.save();
        res.status(201).send({ status: true })
    } catch (error) {
        res.status(400).send({ error: "cant follow" });
    }
})

router.get("/blocking/:user/:block", async (req, res) => {

    try {
        const user = await Block.findOne({ account: req.params.user, follow: req.params.follow })
        if (user) {
            return res.status(200).send({ status: true })
        }
        return res.status(200).send({ status: false })
    } catch (error) {
        return res.status(500).send({ status: error })
    }
})

router.delete("/unblock", async (req, res) => {
    try {
        const user = await Block.findOneAndDelete({ account: req.body.account, block: req.body.block })
        if (user) {
            return res.status(200).send({ status: true })
        }
        return res.status(400).send({ status: false })
    } catch (error) {
        return res.status(500).send({ status: error })
    }
})
export default router;