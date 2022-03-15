import { Router } from 'express';

import { userRouter } from './userRouter';
import { postRouter } from './postRouter';
import { commentRouter } from './commentRouter';
import { authRouter } from './authRouter';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/posts', postRouter);
routes.use('/comments', commentRouter);
routes.use('/auth', authRouter);

export const apiRouter = routes;
