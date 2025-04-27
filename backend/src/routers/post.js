import express from 'express'
import authentication from "../middleware/authentication.js";
import postController from '../controllers/postController.js';

const router = new express.Router()

router.post('/createPost', postController.createPost)

router.patch('/updatePost', postController.updatePost)

router.delete("/deletePost/:postId", postController.deletePost)

export default router