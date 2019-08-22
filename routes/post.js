import express from 'express';

import asyncMiddleware from '../middlewares/asyncMiddleware';
import { diskStorageSingle } from '../middlewares/diskStorage';
import * as postController from '../controllers/postController';
import * as commentController from '../controllers/commentController';

const router = express.Router();

router.post('', asyncMiddleware(postController.addPost));
router.get('', asyncMiddleware(postController.getPosts));
/*
router.post('/content/image', diskStorageSingle, asyncMiddleware(postController.attachMedia));
router.get('/:postId', asyncMiddleware(postController.getPostById));
router.get('/:postId/comments', asyncMiddleware(commentController.getPostComments));
router.post('/:postId/comments', asyncMiddleware(commentController.addPostComments)); */

export default router;