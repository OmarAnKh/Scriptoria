import Story from "../models/story.js";
import Writers from "../models/writers.js";
import Account from "../models/account.js";
import Like from "../models/like.js";
import Comment from "../models/comment.js";
import Rating from "../models/rating.js";
import { converImgToBuffer } from "../utils/image.js";
import ReadingList from "../models/readingList.js";

const createStory = async (req, res) => {
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

const getAccountWorks = async (req, res) => {
    try {
        const storiesObject = await Writers.find({ AccountId: req.params.id });
        res.status(200).send(storiesObject);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

const getStoryById = async (req, res) => {
    try {
        const stories = await Story.findById(req.params.id);
        res.status(200).send(stories);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const searchByCriteria = async (req, res) => {
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
            ], publishStatus: true
        });

        if (stories.length === 0) {
            if (users.length > 0) {
                return res.status(200).send({ users, status: true });
            }
            return res.status(404).send({ error: "could not find stories", status: false });
        }
        return res.status(200).send({ stories, users, status: true });
    } catch (error) {
        return res.status(500).send({ error, status: false });
    }
}

const getStories = async (req, res) => {


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
}

const getAllStoryInfo = async (req, res) => {
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

}

const updateStory = async (req, res) => {
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
}

const getStoryByGenre = async (req, res) => {
    const { genre } = req.params;
    try {
        let stories;
        if (genre.toLowerCase() === 'all') {
            stories = await Story.find({ publishStatus: true });
        } else {
            stories = await Story.find({ genres: genre, publishStatus: true });
        }
        if (!stories.length) {
            return res.status(404).send()
        }

        const storiesWithDetails = [];
        for (const story of stories) {
            const writers = await Writers.find({ StoryId: story._id })
                .populate({ path: "AccountId" })
                .populate({ path: "StoryId" });

            if (!writers) {
                return res.status(404).send();
            }

            const countRates = await Rating.countDocuments({ StoryId: story._id });
            const result = await Rating.aggregate([
                { $match: { StoryId: story._id } },
                { $group: { _id: null, averageRate: { $avg: "$rating" } } }
            ]);
            const averageRating = result.length > 0 ? result[0].averageRate : 0;
            storiesWithDetails.push({
                story: story,
                writers: writers,
                counts: { rates: countRates, avg: averageRating }
            });
        }
        res.send(storiesWithDetails);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteStory = async (req, res) => {

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

}

export default {
    createStory,
    getAccountWorks,
    getStoryById,
    searchByCriteria,
    getStories,
    getAllStoryInfo,
    updateStory,
    getStoryByGenre,
    deleteStory
}