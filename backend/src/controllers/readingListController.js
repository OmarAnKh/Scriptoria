import ReadingList from '../models/readingList.js'

const createReadingList = async (req, res) => {
    const readingList = new ReadingList({
        name: req.body.name,
        accountId: req.user.id,
        privacy: req.body.privacy
    });
    if (req.body.stories) readingList.stories = req.body.stories;
    try {
        await readingList.save();
        res.send(readingList);
    } catch (error) {
        res.status(400).send(error);
    }
}

const getReadingList = async (req, res) => {
    const accountId = req.query.accountId;
    const all = req.query.all === "true"
    try {
        const lists = all ? await ReadingList.find({ accountId }) : await ReadingList.find({ accountId, privacy: true })
        if (!lists) return res.status(404).send();
        res.send(lists);
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
}

const getAccountReadingListByListId = async (req, res) => {
    try {
        const list = await ReadingList.findOne({ _id: req.params.listId, accountId: req.params.accountId }).populate('stories');
        if (!list) return res.send({ "hello": "nothing" });
        res.send(list);
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
}

const updateReadingList = async (req, res) => {
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
}

const deleteReadingList = async (req, res) => {
    try {
        const list = await ReadingList.findByIdAndDelete(req.params.id)
        if (!list) {
            return res.status(404).send();
        }
        res.send(list)
    } catch (e) {
        res.status(500).send();
    }
}

export default {
    createReadingList,
    getReadingList,
    getAccountReadingListByListId,
    updateReadingList,
    deleteReadingList
}