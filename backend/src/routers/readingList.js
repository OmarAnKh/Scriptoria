import express from 'express'
import ReadingList from '../models/readingList.js'
import authentication from "../middleware/authentication.js";
const router = new express.Router()

router.post('/readingLists', authentication, async (req, res) => {
    const readingList = new ReadingList({
        name: req.body.name,
        accountId: req.user.id,
        privacy : req.body.privacy
    });
    if (req.body.stories) readingList.stories = req.body.stories;
    try {
        await readingList.save();
        res.send(readingList);
    } catch (error) {
        res.status(400).send(error);
    }
})


router.get('/readingLists',  async (req, res) => {
    const accountId = req.query.accountId;
    console.log(accountId)
    const all = req.query.all === "true"
    console.log(all)
    try {
        const lists = all? await ReadingList.find({accountId}) : await ReadingList.find({accountId, privacy : true})
        if (!lists) return res.send();
        res.send(lists);
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
})

router.get('/readingLists/:id', authentication, async (req, res) => {
    try {
        const stories = await ReadingList.findOne({ _id: req.params.id, accountId: req.user.id }).populate('stories');
        if (!stories) return res.send({ nothing: true });
        res.send(stories);
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
})


router.patch('/readingLists/:id', authentication, async (req, res) => {
    const id = req.params.id;
    const stories = req.body.stories;
    const name = req.body.name;
    const privacy = req.body.privacy

    try {
        const readingList = await ReadingList.findById(id);
        if (!readingList) {
            return res.status(404).send({ error: 'Reading list not found' });
        }
        readingList.stories = stories;
        readingList.name = name;
        readingList.privacy = privacy;
        await readingList.save()
        res.send(readingList);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

router.delete('/readingLists/:id', async(req, res)=>{
    try{
        const list = await ReadingList.findByIdAndDelete(req.params.id)
        if(!list){
            return res.status(404).send();
        }
        res.send(list)
    }catch(e){
        res.status(500).send();
    }
})

export default router

