import express from 'express';
const router = express.Router();

import { gastoRouter } from './gastoRoute';
import { userRouter } from './userRoute';

router.use('/gastos', gastoRouter);
router.use('/users', userRouter);

export { router };