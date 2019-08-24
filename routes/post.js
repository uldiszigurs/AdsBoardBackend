import express from 'express';

import asyncMiddleware from '../middlewares/asyncMiddleware';
import { diskStorageSingle } from '../middlewares/diskStorage';
import * as postController from '../controllers/postController';
import * as commentController from '../controllers/commentController';

const router = express.Router();


router.get('/postid/:postid',asyncMiddleware(postController.getPostById));
router.get('/users/:username',asyncMiddleware(postController.getPostsByUser));
router.post('/comments/:postid', asyncMiddleware(commentController.addComment));
router.get('/comments/:postid', asyncMiddleware(commentController.getCommentsByPostId));
router.get('/comment/:commentid', asyncMiddleware(commentController.getCommentById));
router.post('', asyncMiddleware(postController.addPost));
router.get('', asyncMiddleware(postController.getAllPosts));

//TODO: Should not be able to add comment to non existing post. 

/*
router.post('/content/image', diskStorageSingle, asyncMiddleware(postController.attachMedia));
router.get('/:postId', asyncMiddleware(postController.getPostById));
*/

export default router;