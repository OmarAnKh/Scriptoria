import Block from "../models/block.js";

const blockAccount = async (req, res) => {
    const newBlock = new Block(req.body);
    try {
        await newBlock.save();
        res.status(201).send({ status: true })
    } catch (error) {
        res.status(400).send({ error: "cant follow" });
    }
}

const getIfIBlockThisAccount = async (req, res) => {

    try {
        const user = await Block.findOne({ account: req.params.user, follow: req.params.follow })
        if (user) {
            return res.status(200).send({ status: true })
        }
        return res.status(200).send({ status: false })
    } catch (error) {
        return res.status(500).send({ status: error })
    }
}

const unBlockAccount = async (req, res) => {
    try {
        const user = await Block.findOneAndDelete({ account: req.body.account, block: req.body.block })
        if (user) {
            return res.status(200).send({ status: true })
        }
        return res.status(400).send({ status: false })
    } catch (error) {
        return res.status(500).send({ status: error })
    }
}

export default {
    blockAccount,
    getIfIBlockThisAccount,
    unBlockAccount
}