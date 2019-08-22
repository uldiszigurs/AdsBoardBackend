import express from 'express';
import asyncMiddleware from '../middlewares/asyncMiddleware';
import { register, logIn } from '../controllers/authenticationController';



const router = express.Router();

router.post('/register', asyncMiddleware(register));
router.post('/login', asyncMiddleware(logIn));

export default router;