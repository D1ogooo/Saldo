import express from 'express';
import { UserController } from '../controllers/userController';
const user = new UserController();
const userRouter = express.Router();

userRouter.post('/signin', user.signin);
userRouter.post('/signup', user.signup);

export { userRouter };  