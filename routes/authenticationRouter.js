import express from 'express';
import controllerWrapper from '../utilities/controllerWrapper';
import { register, logIn } from '../controllers/authenticationController';



const router = express.Router();

router.post('/register', controllerWrapper(register));
router.post('/login', controllerWrapper(logIn));

export default router;