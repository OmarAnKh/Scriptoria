import express from 'express'
import authentication from "../middleware/authentication.js";
import roomController from '../controllers/roomController.js';

const router = new express.Router()

router.post('/room', authentication, roomController.createRoom);

router.get('/room/:userId', authentication, roomController.getRoomForAccount);

router.patch('/room', authentication, roomController.updateRoom);

router.delete('/room/:id', authentication, roomController.deleteRoom);

export default router