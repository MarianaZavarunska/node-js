import { Router } from 'express';

import { authRouter } from './authRouter';
import { userRouter } from './userRouter';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/users', userRouter);

export const apiRouter = routes;
