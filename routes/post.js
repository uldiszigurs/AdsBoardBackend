import express from 'express';

import asyncMiddleware from '../middlewares/asyncMiddleware';
import { diskStorageSingle } from '../middlewares/diskStorage';
import * as postController from '../controllers/postController';
import * as commentController from '../controllers/commentController';

const router = express.Router();

router.post('', asyncMiddleware(postController.addPost));
router.get('', asyncMiddleware(postController.getAllPosts));
router.get('/:postid',asyncMiddleware(postController.getPostById));
//router.get('/:postid',asyncMiddleware(postController.getPostByUser)); //FIXME: /:postid
router.post('/:postid/comment', asyncMiddleware(postController.addComment));
router.get('/:postid/comments', asyncMiddleware(postController.getAllCommentsForPost));
router.get('/users/:username/comments', asyncMiddleware(postController.getAllCommentsForPost)); /* not sure if this should be here, FIXME: CAREFUL
might change to /user path. where to fetch posts & comments by username , these endpoints for userActivity or smthing like that*/

/*
router.post('/content/image', diskStorageSingle, asyncMiddleware(postController.attachMedia));
router.get('/:postId', asyncMiddleware(postController.getPostById));
*/

export default router;