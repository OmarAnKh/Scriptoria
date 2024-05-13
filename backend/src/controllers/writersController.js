import Writers from "../models/writers.js";
import Story from "../models/story.js"

const getWritersByStoryId = async (req, res) => {
    const storyId = req.params.id
    try {
        const writers = await Writers.find({ StoryId: storyId }).populate('AccountId')
        if (!writers || writers.length === 0) {
            return res.status(404).send({ state: false, error: "Could not find any writer" });
        }

        let users = writers.map((writer) => {
            return {
                displayName: writer.AccountId.displayName,
                userName: writer.AccountId.userName,
                email: writer.AccountId.email,
                dateOfBirth: writer.AccountId.dateOfBirth,
                type: writer.AccountId.type,
                gender: writer.AccountId.gender,
                description: writer.AccountId.description,
                region: writer.AccountId.region,
                tokens: writer.AccountId.tokens,
                profilePicture: writer.AccountId.profilePicture,
                AccountId: writer.AccountId._id,
                rule: writer.rule,
                StoryId: storyId,
                _id: writer._id
            }
        })
        return res.status(200).send({ state: true, users });
    } catch (error) {
        res.status(500).send({ state: false, error: "Server error" })
    }
}

const getStoriesByWriterId = async (req, res) => {
    const AccountId = req.params.id
    const flag = req.params.flag == "true"
    try {
        const users = await Writers.find({ AccountId });
        if (!users || users.length === 0) {
            return res.status(404).send({ state: false, error: "Could not find any writer" });
        }
        const storiesID = users.map(writer => writer.StoryId);
        let stories
        if (flag) {

            stories = await Story.find({ _id: { $in: storiesID }, publishStatus: true });
        } else {

            stories = await Story.find({ _id: { $in: storiesID } });
        }
        if (stories.length === 0) {
            return res.status(404).send({ state: false, error: "Could not find any story" });
        }
        return res.status(200).send({ state: true, stories });

    } catch (error) {
        return res.status(500).send({ state: false, error: "Server error" });
    }
}

const createWriter = async (req, res) => {
    try {
        const user = await Writers.findOne({ AccountId: req.body.AccountId, StoryId: req.body.StoryId })
        if (user) {
            return res.status(400).send({ message: false })
        }
        const writer = new Writers(req.body)
        await writer.save()
        return res.status(200).send({ message: true, writer })
    } catch (error) {
        return res.status(500).send({ message: false })
    }
}

const updateWriter = async (req, res) => {
    try {
        const user = await Writers.findOne({ AccountId: req.body.AccountId, StoryId: req.body.StoryId })
        if (!user) {
            return res.status(400).send({ message: false })
        }
        user.rule = req.body.rule
        await user.save()
        return res.status(200).send({ message: true, user })
    } catch (error) {
        return res.status(500).send({ message: false })
    }
}

const deleteWriter = async (req, res) => {
    try {
        const user = await Writers.findOneAndDelete({ AccountId: req.body.AccountId, StoryId: req.body.StoryId })
        if (!user) {
            return res.status(400).send({ message: false })
        }
        return res.status(200).send({ message: true, user })
    } catch (error) {
        return res.status(500).send({ message: false })
    }
}

export default {
    getWritersByStoryId,
    getStoriesByWriterId,
    createWriter,
    updateWriter,
    deleteWriter,
}