import express from 'express'
import authentication from "../middleware/authentication.js";
import Reply from './../models/replies.js'
import repliesController from '../controllers/repliesController.js';

const router = new express.Router()

router.post('/replies',authentication ,repliesController.createReply)

router.get('/replies/:storyId',repliesController.getRepliesByStoryId)

router.patch('/replies/:id' ,authentication ,repliesController.updateReplyById)

router.delete('/replies/:id', authentication, repliesController.deleteReplyById)

export default router