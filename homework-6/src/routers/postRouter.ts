import { Router } from 'express';
import { postController } from '../controllers/postController';
import { postMiddleware } from '../middlewares';

const routes = Router();

routes.get('/:userId', postController.getAllPostsById);
routes.patch('/:userId', postMiddleware.updatePost, postController.updatePostById);

export const postRouter = routes;
