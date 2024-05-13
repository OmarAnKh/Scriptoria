import express from 'express'
import authentication from "../middleware/authentication.js";
import likeController from '../controllers/likeController.js';

const router = new express.Router()

router.post('/likes', authentication, likeController.createLike);

router.get('/likes', likeController.getLike);

router.delete('/likes', likeController.deleteLike);

export default router;
