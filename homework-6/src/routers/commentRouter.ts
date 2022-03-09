import { Router } from 'express';
import { commentController } from '../controllers/commentController';

const routes = Router();

routes.get('/:userId', commentController.commentsAndPostsByUserId);
routes.patch('/action', commentController.updateComment);

export const commentRouter = routes;
