import express from 'express'
import Like from "../models/like.js";
import authentication from "../middleware/authentication.js";

const router = new express.Router()

router.post('/likes', authentication, async (req, res) => {
    const like = new Like(req.body)
    try {
        await like.save()
        res.status(201).send(like)

    } catch (error) {
        return res.status(500).send(error)
    }
});


router.get('/likes', async (req, res) => {

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
})


router.delete('/likes', async (req, res) => {

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
})

export default router;
