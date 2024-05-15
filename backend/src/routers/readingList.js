import express from 'express'
import authentication from "../middleware/authentication.js";
import readingListController from '../controllers/readingListController.js';

const router = new express.Router()

router.post('/readingLists', authentication, readingListController.createReadingList);

router.get('/readingLists', readingListController.getReadingList);

router.get('/lists/:accountId/:listId', readingListController.getAccountReadingListByListId);

router.patch('/readingLists/:id', authentication, readingListController.updateReadingList);

router.delete('/readingLists/:id', readingListController.deleteReadingList);

export default router

