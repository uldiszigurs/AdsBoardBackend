import express from 'express';
import * as categoryController from '../controllers/categoryController';
import controllerWrapper from '../utilities/controllerWrapper';

const router = express.Router();

router.get('/', controllerWrapper(categoryController.getCategoryList));

export default router;
