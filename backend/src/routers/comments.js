import express from 'express'
import authentication from "../middleware/authentication.js";
import commentController from '../controllers/commentController.js';

const router = new express.Router()

router.post('/comments', authentication, commentController.createComment);

router.get('/comments/:id', commentController.getCommentById);

router.get('/comments/count/:id', commentController.getCommentCountByStoryId);

router.patch('/comments/:id', authentication, commentController.updateCommentById);

router.delete('/comments/:id', authentication, commentController.deleteCommentById);

export default router