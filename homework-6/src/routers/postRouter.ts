import { Router } from 'express';
import { postController } from '../controllers/postController';

const routes = Router();

routes.get('/:userId', postController.getAllPostsById);
routes.patch('/:userId', postController.updatePostById);

export const postRouter = routes;
