import express from 'express';
import index from '../controllers/indexController';
import controllerWrapper from '../utilities/controllerWrapper';

const router = express.Router();

router.get('/*', controllerWrapper(index));

export default router;
