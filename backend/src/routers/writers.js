import express from "express";
import writersController from "../controllers/writersController.js";
import authentication from "../middleware/authentication.js";

const router = express.Router();

router.get("/find/writers/:id", writersController.getWritersByStoryId);

router.get("/get/writers/:id", writersController.getWritersByStoryId);

router.get("/find/stories/:id/:flag", writersController.getStoriesByWriterId);

router.post("/Writer", authentication, writersController.createWriter);

router.patch("/rule/update", authentication, writersController.updateWriter);

router.delete('/writer/delete', authentication, writersController.deleteWriter);

router.get('/getStoryWritersUsingStoryId/:storyId', writersController.getStoryWritersUsingStoryId)

export default router;

