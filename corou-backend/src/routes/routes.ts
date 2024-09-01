import express from 'express';
import userRouter from './user.router';

const router = express.Router();

router.use('/user', userRouter);
// router.use('/routine', routineRouter);
// router.use('/item', itemRouter);

export default router;