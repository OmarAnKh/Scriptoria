import express from 'express'
import authentication from "../middleware/authentication.js";
import ratingController from '../controllers/ratingController.js';

const router = new express.Router()

router.post('/rate', authentication, ratingController.createRate);

router.get('/rate/:id', authentication, ratingController.getRateById);

router.get('/rates/:id', ratingController.getRateCount);

router.patch('/rate/:id', authentication, ratingController.updateRateById);

export default router