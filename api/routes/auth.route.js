import express from 'express'
import {registerController , loginController,testController} from '../controllers/auth.controller.js';
// import { isAdmin, requireSignIn } from '../middlewares/auth.middleware.js';

const router= express.Router();

router.post('/register', registerController);
router.post('/login',loginController);

// router.get('/test',requireSignIn,isAdmin ,testController);


export default router;

