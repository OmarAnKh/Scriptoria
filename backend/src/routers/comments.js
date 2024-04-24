import express from 'express'
import Comment from '../models/comment.js'
import authentication from "../middleware/authentication.js";

const router = new express.Router()

router.post('/comments', authentication, async (req, res) => {
    const comment = new Comment({
        text: req.body.text,
        storyId: req.body.storyId,
        accountId: req.user.id
    })
    try {
        await comment.save()
        res.send(comment)
    } catch (error) {
        res.status(400).send(error)
    }
})


router.get('/comments/:id', async (req, res) => {
    const storyId = req.params.id;
    try {
        const comments = await Comment.find({ storyId }).populate('accountId');
        if (!comments) return res.send(undefined);
        res.send(comments);
    } catch (error) {
        res.status(500).send();
    }
});

router.patch('/comments/:id', authentication, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).send({ error: 'Reading list not found' });
        }
        comment.text = req.body.text
        await comment.save();

        res.send(comment);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})



router.delete('/comments/:id', authentication, async (req, res) => {
    try {
        const comment = await Comment.findOneAndDelete({ _id: req.params.id, accountId: req.user.id });
        if (!comment) {
            return res.status(404).send();
        }
        res.send(comment);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router