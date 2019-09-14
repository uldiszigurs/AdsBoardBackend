import express from 'express';

import asyncMiddleware from '../middlewares/asyncMiddleware';
import * as categoryController from '../controllers/categoryController';

const router = express.Router();

router.get('/', asyncMiddleware(categoryController.getCategoryList));

export default router;
