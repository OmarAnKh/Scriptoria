import Story from "../models/story.js";
import Writers from "../models/writers.js";
import authentication from "../middleware/authentication.js";

import express from "express";
import sharp from "sharp";
import axios from "axios";
import Account from "../models/account.js";

const router = new express.Router();


router.post(
    "/story",
    authentication,
    async (req, res) => {
        try {
            const imageURL = req.body.coverPhoto;
            const imageResponse = await axios.get(imageURL, {
                responseType: "arraybuffer",
            });
            const buffer = await sharp(imageResponse.data)
                .resize({ width: 250, height: 250 })
                .png()
                .toBuffer();

            const story = new Story(req.body);
            story.coverPhoto = buffer;
            await story.save();
            console.log(story)
            const writers = new Writers({
                AccountId: req.user._id,
                StoryId: story._id,
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

router.get("/stories/:id", async (req, res) => {
    try {
        const Stories = await Story.find({ AccountId: req.body._id });
        res.status(200).send({ Stories });
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
                { 'email': criteria },
                { 'displayName': criteria },
                { 'userName': criteria }
            ]
        })
        let storyId
        if (account) {
            console.log(10)

            const writers = await Writers.find(
                { 'AccountId': account._id })

            if (writers.length !== 0) {
                storyId = writers.map(story => story.StoryId);
            }
        }


        const stories = await Story.find({
            $or: [
                { 'genres': criteria },
                { 'title': criteria },
                { 'language': criteria },
                { '_id': storyId },
            ]
        })

        if (stories.length === 0) {
            return res.status(404).send({ error: "could not find stories", status: false });
        }
        return res.status(200).send({ stories, status: true });
    } catch (error) {
        return res.status(500).send({ error, status: false });
    }
})

export default router;
