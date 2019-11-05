import express from 'express';

import { diskStorageSingle } from '../middlewares/diskStorage';
import * as mediaController from '../controllers/mediaController';
import * as commentController from '../controllers/commentController';
import controllerWrapper from '../utilities/controllerWrapper';

const router = express.Router();

router.get('', controllerWrapper(mediaController.getPosts));
router.post('', controllerWrapper(mediaController.addPosts));
router.post('/content/image', diskStorageSingle, controllerWrapper(mediaController.attachMedia));
router.get('/:mediaId', controllerWrapper(mediaController.getPostById));


export default router;
