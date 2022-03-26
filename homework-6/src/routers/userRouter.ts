import { Router } from 'express';
import { userController } from '../controllers/userController';
import { userMiddleware } from '../middlewares';

const routes = Router();

routes.get('/', userController.getAllUsers);
routes.get('/:email', userController.getUserByEmail);
routes.post('/', userMiddleware.validateCreateUser, userController.createUser);
routes.patch('/:id', userMiddleware.validateUpadateUser, userController.updateById);
routes.delete('/:id', userController.deleteById);

export const userRouter = routes;
