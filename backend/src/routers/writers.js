import express from "express";
import Writers from "../models/writers.js";
import Account from "../models/account.js";
import Story from "../models/story.js";

const router = express.Router();

router.get("/find/writers/:id", async (req, res) => {
    const StoryId = req.params.id;
    try {
        const writers = await Writers.find({ StoryId });

        if (!writers || writers.length === 0) {
            return res.status(404).send({ state: false, error: "Could not find any writer" });
        }
        const usersId = writers.map(writer => writer.AccountId);

        const storiesCountPerWriter = await Promise.all(usersId.map(async accountId => {
            const count = await Story.countDocuments({ publishStatus: true, 'accountId': accountId });
            return { accountId, count };
        }));

        const users = await Account.find({ _id: { $in: usersId } });

        const mergedData = users.map(user => {
            const writerData = writers.find(writer => writer.AccountId.toString() === user._id.toString());
            const storyCount = storiesCountPerWriter.find(count => count.accountId.toString() === user._id.toString());
            return {
                ...user._doc,
                storyCount: storyCount ? storyCount.count : 0,
                ...writerData._doc
            };
        });

        return res.status(200).send({ state: true, users: mergedData });
    } catch (error) {
        return res.status(500).send({ state: false, error: "Server error" });
    }
});

router.get("/find/stories/:id/:flag", async (req, res) => {
    const AccountId = req.params.id
    const flag = req.params.flag
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
})


router.post("/Writer", async (req, res) => {
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
})

router.patch("/rule/update", async (req, res) => {
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
})


router.delete('/writer/delete', async (req, res) => {
    try {
        const user = await Writers.findOneAndDelete({ AccountId: req.body.AccountId, StoryId: req.body.StoryId })
        if (!user) {
            return res.status(400).send({ message: false })
        }
        return res.status(200).send({ message: true, user })
    } catch (error) {
        return res.status(500).send({ message: false })
    }
})
export default router;

