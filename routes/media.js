import express from 'express';

import asyncMiddleware from '../middlewares/asyncMiddleware';
import { diskStorageSingle } from '../middlewares/diskStorage';
import * as mediaController from '../controllers/mediaController';
import * as commentController from '../controllers/commentController';

const router = express.Router();

router.get('', asyncMiddleware(mediaController.getPosts));
router.post('', asyncMiddleware(mediaController.addPosts));
router.post('/content/image', diskStorageSingle, asyncMiddleware(mediaController.attachMedia));
router.get('/:mediaId', asyncMiddleware(mediaController.getPostById));


export default router;
