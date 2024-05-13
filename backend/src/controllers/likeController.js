import Like from "../models/like.js";

const createLike = async (req, res) => {
    const like = new Like(req.body)
    try {
        await like.save()
        res.status(201).send(like)
    } catch (error) {
        return res.status(500).send(error)
    }
}

const getLike = async (req, res) => {
    try {
        const { AccountId, StoryId } = req.query
        const liked = await Like.findOne({ AccountId, StoryId })
        if (!liked) {
            return res.status(404).send({ message: false })
        }
        res.status(200).send({ message: true })
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteLike = async (req, res) => {
    try {
        const { AccountId, StoryId } = req.body
        const like = await Like.findOneAndDelete({ AccountId, StoryId })
        if (!like) {
            return res.status(400).send()
        }
        res.status(200).send(like)
    } catch (error) {
        res.status(500).send(error)
    }
}

export default {
    createLike,
    getLike,
    deleteLike
}