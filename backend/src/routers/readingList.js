import express from 'express'
import ReadingList from '../models/readingList.js'
import authentication from "../middleware/authentication.js";

const router = new express.Router()

router.post('/readingLists', authentication, async (req, res) => {
    const readingList = new ReadingList({
        name: req.body.name,
        accountId: req.user.id
    })
    if (req.body.stories) readingList.stories = req.body.stories
    try {
        await readingList.save()
        res.send(readingList)
    } catch (error) {
        res.status(400).send(error)
    }
})


router.get('/readingLists',  async (req, res) => {
    const accountId = req.query.accountId
    try {
        const lists = await ReadingList.find({ accountId })
        if (!lists) return res.send()
        console.log(lists)
        res.send(lists)
    } catch (error) {
        console.log(error)
        res.status(400).send()
    }
})

router.get('/readingLists/:id', authentication, async (req, res) => {
    try {
        const stories = await ReadingList.findOne({ _id: req.params.id, accountId: req.user.id }).populate('stories')
        if (!stories) return res.send({ nothing: true })
        res.send(stories)
    } catch (error) {
        console.log(error)
        res.status(400).send()
    }
})


router.patch('/readingLists/:id', authentication, async (req, res) => {
    const id = req.params.id;
    const stories = req.body.stories;

    try {
        const readingList = await ReadingList.findById(id);
        if (!readingList) {
            return res.status(404).send({ error: 'Reading list not found' });
        }
        readingList.stories = stories
        await readingList.save();

        res.send(readingList);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

export default router

