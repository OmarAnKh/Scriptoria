import express from "express";
import writersController from "../controllers/writersController.js";

const router = express.Router();

router.get("/find/writers/:id", writersController.getWritersByStoryId);

router.get("/get/writers/:id", writersController.getWritersByStoryId);

router.get("/find/stories/:id/:flag", writersController.getStoriesByWriterId);

router.post("/Writer", writersController.createWriter);

router.patch("/rule/update", writersController.updateWriter);

router.delete('/writer/delete', writersController.deleteWriter);

export default router;

