import authentication from "../middleware/authentication.js";
import express from "express";
import storyController from "../controllers/storyController.js";

const router = new express.Router();

router.post("/story", authentication, storyController.createStory);

router.get("/MyWorks/:id", storyController.getAccountWorks);

router.get("/story/:id", storyController.getStoryById);

router.get("/search/:criteria", storyController.searchByCriteria)

router.get('/stories', storyController.getStories);

router.get('/stories/:id', storyController.getAllStoryInfo);

router.patch('/stories/update', authentication, storyController.updateStory);

router.get('/storiesGenre/:genre', storyController.getStoryByGenre);

router.delete('/delete/story/:id', authentication, storyController.deleteStory);

export default router;
