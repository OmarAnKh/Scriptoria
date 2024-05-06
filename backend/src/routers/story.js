import Story from "../models/story.js";
import Writers from "../models/writers.js";
import authentication from "../middleware/authentication.js";
import express from "express";
import Account from "../models/account.js";
import Like from "../models/like.js";
import Comment from "../models/comment.js";
import Rating from "../models/rating.js";
import { converImgToBuffer } from "../utils/image.js";
import ReadingList from "../models/readingList.js";

const router = new express.Router();


router.post("/story", authentication, async (req, res) => {
    try {
        const buffer = await converImgToBuffer(req.body.coverPhoto);
        const story = new Story(req.body);
        story.coverPhoto = buffer;
        await story.save();
        const writers = new Writers({
            AccountId: req.user._id,
            StoryId: story._id,
            rule: "owner"
        });
        await writers.save();
        res.status(201).send({ story, writers });
    } catch (error) {
        res
            .status(500)
            .send({ error: "An error occurred while processing your request" });
    }
}
);

router.get("/MyWorks/:id", async (req, res) => {
    try {
        const storiesObject = await Writers.find({ AccountId: req.params.id });
        res.status(200).send(storiesObject);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});


router.get("/story/:id", async (req, res) => {
    try {
        const stories = await Story.findById(req.params.id);
        res.status(200).send(stories);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});




router.get("/search/:criteria", async (req, res) => {
    const criteria = req.params.criteria

    try {
        const account = await Account.findOne({
            $or: [
                { 'email': { $regex: new RegExp(criteria, 'i') } },
                { 'displayName': { $regex: new RegExp(criteria, 'i') } },
                { 'userName': { $regex: new RegExp(criteria, 'i') } }
            ]
        });
        let storyId
        if (account) {
            const writers = await Writers.find(
                { 'AccountId': account._id })

            if (writers.length !== 0) {
                storyId = writers.map(story => story.StoryId);
            }
        }
        const users = await Account.find({
            $or: [
                { 'email': { $regex: new RegExp(criteria, 'i') } },
                { 'displayName': { $regex: new RegExp(criteria, 'i') } },
                { 'userName': { $regex: new RegExp(criteria, 'i') } }
            ]
        });


        const stories = await Story.find({
            $or: [
                { 'genres': { $regex: new RegExp(criteria, 'i') } },
                { 'title': { $regex: new RegExp(criteria, 'i') } },
                { 'language': { $regex: new RegExp(criteria, 'i') } },
                { '_id': storyId }
            ]
        });

        if (stories.length === 0) {
            return res.status(404).send({ error: "could not find stories", status: false });
        }
        return res.status(200).send({ stories, users, status: true });
    } catch (error) {
        return res.status(500).send({ error, status: false });
    }
})

router.get('/stories', async (req, res) => {

    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 7;

    try {
        const stories = await Story.find({ publishStatus: true }).limit(limit);

        if (!stories) {
            res.status(404).send();
        }
        res.status(200).send(stories);

    } catch (error) {
        res.status(500).send();
    }
})

router.get('/stories/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const story = await Story.findById(_id)
        if (!story) {
            return res.status(404).send()
        }

        const writers = await Writers.find({ StoryId: _id });

        if (!writers) {
            return res.status(404).send()
        }

        const accounts = [];
        for (const writer of writers) {
            const account = await Account.findById(writer.AccountId);

            if (!account) {
                return res.status(404).send();
            }

            accounts.push(account);
        }

        res.send({ story: story, accounts: accounts })

    } catch (error) {
        res.status(500).send(error)
    }

});


router.patch('/stories/update', async (req, res) => {
    if (req.body.coverPhoto) {
        const buffer = await converImgToBuffer(req.body.coverPhoto)
        req.body.coverPhoto = buffer;
    }
    try {
        const updatedStory = await Story.findByIdAndUpdate(req.body.id, req.body, { new: true, runValidators: true });

        if (!updatedStory) {
            res.status(404).send()
        }

        res.status(200).send(updatedStory);

    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/storiesGenre/:genre', async (req, res) => {
    const { genre } = req.params;
    try {
        let stories;
        if (genre.toLowerCase() === 'all') {
            stories = await Story.find({ publishStatus: true });
        } else {
            stories = await Story.find({ genres: genre, publishStatus: true });
        }

        const storiesWithDetails = [];
        for (const story of stories) {
            const writers = await Writers.find({ StoryId: story._id });

            if (!writers) {
                return res.status(404).send();
            }

            const accounts = [];
            for (const writer of writers) {
                const account = await Account.findById(writer.AccountId);

                if (!account) {
                    return res.status(404).send();
                }

                accounts.push(account);
            }
            const countRates = await Rating.countDocuments({ StoryId: story._id });
            const result = await Rating.aggregate([
                { $match: { StoryId: story._id } },
                { $group: { _id: null, averageRate: { $avg: "$rating" } } }
            ]);
            const averageRating = result.length > 0 ? result[0].averageRate : 0;
            storiesWithDetails.push({
                story: story,
                accounts: accounts,
                counts: { rates: countRates, avg: averageRating }
            });
        }
        res.send(storiesWithDetails);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/delete/story/:id', authentication, async (req, res) => {

    try {
        const story = await Story.findByIdAndDelete(req.params.id)
        if (!story) {
            res.status(400).send({ message: false, error: "couldn't find the story" })
        }
        await ReadingList.updateOne(
            { $pull: { stories: req.params.id } }
        );
        await Comment.deleteMany({ storyId: req.params.id })
        await Like.deleteMany({ StoryId: req.params.id })
        await Rating.deleteMany({ StoryId: req.params.id })
        await Writers.deleteMany({ StoryId: req.params.id })
        res.status(200).send({ message: true, story })
    } catch (error) {
        res.status(500).send({ message: false, error: 'Internal Server Error' });
    }

})
export default router;
