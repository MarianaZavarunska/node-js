import { Router } from 'express';

import { userRouter } from './userRouter';
import { postRouter } from './postRouter';
import { commentRouter } from './commentRouter';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/posts', postRouter);
routes.use('/comments', commentRouter);

export const apiRouter = routes;
