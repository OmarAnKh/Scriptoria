import Story from "../models/story.js";
import Writers from "../models/writers.js";
import authentication from "../middleware/authentication.js";
import multer from "multer";
import express from "express";
import sharp from "sharp";
import axios from "axios";

const router = new express.Router();


router.post(
    "/story",
    authentication,
    async (req, res) => {
        try {
            const imageURL = req.body.coverPhoto;
            let imageResponse = await axios.get(imageURL, {
                responseType: "arraybuffer",
            });
            let file = {
                buffer: Buffer.from(imageResponse.data, "binary"),
                fieldname: "coverPhoto",
                originalname: "imageName.jpg",
                encoding: "7bit",
                mimetype: "image/jpeg",
            };
            const buffer = await sharp(file.buffer)
                .resize({ width: 250, height: 250 })
                .png()
                .toBuffer();

            const story = new Story(req.body);
            story.coverPhoto = buffer;
            await story.save();

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

export default router;
