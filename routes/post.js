import express from 'express';

import asyncMiddleware from '../middlewares/asyncMiddleware';
import { diskStorageSingle } from '../middlewares/diskStorage';
import * as postController from '../controllers/postController';
import * as commentController from '../controllers/commentController';
import * as mediaController from '../controllers/mediaController';
import * as categoryController from '../controllers/categoryController';
import authenticate from '../middlewares/authenticate';
import ControllerWrapper from '../utilities/ControllerWrapper';
const router = express.Router();


router.get('/postid/:postid',asyncMiddleware(postController.getPostById));
router.get('/users/:username', authenticate, asyncMiddleware(postController.getPostsByUser)); //PRIVATE ROUTE
router.post('/comments/:postid', asyncMiddleware(commentController.addComment));
router.get('/comments/:postid', asyncMiddleware(commentController.getCommentsByPostId));
router.get('/comment/:commentid', asyncMiddleware(commentController.getCommentById));
router.post('/:postid/media', diskStorageSingle, asyncMiddleware(mediaController.attachMedia));
router.get('/:postid/media/', asyncMiddleware(mediaController.getMediaByPostId)); //FIXME: CAREFUL
router.get('/category/:category', asyncMiddleware(postController.getPostsByCategory));
router.get('/media', asyncMiddleware(mediaController.getAllmedia));
router.post('', ControllerWrapper(postController.addPost, categoryController.updateCategoryList));
router.get('', asyncMiddleware(postController.getAllPosts));


//TODO: Should not be able to add comment to non existing post. 

/*
router.post('/content/image', diskStorageSingle, asyncMiddleware(postController.attachMedia));
router.get('/:postId', asyncMiddleware(postController.getPostById));
*/

export default router;