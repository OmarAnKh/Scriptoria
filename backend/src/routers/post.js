import express from 'express'
import authentication from "../middleware/authentication.js";
import postController from '../controllers/postController.js';

const router = new express.Router()

router.post('/createPost', authentication, postController.createPost)

router.patch('/updatePost', authentication, postController.updatePost)

router.delete("/deletePost/:postId", authentication, postController.deletePost)

export default router