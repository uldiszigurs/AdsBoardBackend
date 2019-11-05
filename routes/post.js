import express from 'express';
import { diskStorageSingle } from '../middlewares/diskStorage';
import * as postController from '../controllers/postController';
import * as commentController from '../controllers/commentController';
import * as mediaController from '../controllers/mediaController';
import * as categoryController from '../controllers/categoryController';
import authenticate from '../middlewares/authenticate';
import controllerWrapper from '../utilities/controllerWrapper';
const router = express.Router();


router.get('/postid/:postid',controllerWrapper(postController.getPostById));
router.get('/users/:username', authenticate, controllerWrapper(postController.getPostsByUser)); //PRIVATE ROUTE
router.post('/comments/:postid', controllerWrapper(commentController.addComment));
router.get('/comments/:postid', controllerWrapper(commentController.getCommentsByPostId));
router.get('/comment/:commentid', controllerWrapper(commentController.getCommentById));
router.post('/:postid/media', diskStorageSingle, controllerWrapper(mediaController.attachMedia));
router.get('/:postid/media/', controllerWrapper(mediaController.getMediaByPostId)); //FIXME: CAREFUL
router.get('/category/:category', controllerWrapper(postController.getPostsByCategory));
router.get('/media', controllerWrapper(mediaController.getAllmedia));
router.post('', controllerWrapper(postController.addPost, categoryController.updateCategoryList));
router.get('', controllerWrapper(postController.getAllPosts));
router.put('/postid/:postid', controllerWrapper(postController.updatePost));
router.delete('/postid/:postid', controllerWrapper(postController.deletePostById));


//TODO: Should not be able to add comment to non existing post. 

/*
router.post('/content/image', diskStorageSingle, asyncMiddleware(postController.attachMedia));
router.get('/:postId', asyncMiddleware(postController.getPostById));
*/

export default router;