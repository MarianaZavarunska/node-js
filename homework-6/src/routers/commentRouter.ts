import { Router } from 'express';
import { commentController } from '../controllers/commentController';
import { commentMiddleware } from '../middlewares';

const routes = Router();

routes.get('/:userId', commentController.commentsAndPostsByUserId);
routes.patch('/action', commentMiddleware.validateComment, commentController.updateComment);

export const commentRouter = routes;
