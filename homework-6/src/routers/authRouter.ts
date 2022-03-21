import { Router } from 'express';

import { authController } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { userMiddleware } from '../middlewares/usersMiddleware';

const router = Router();

router.post('/registration', authController.registration);
router.post('/login', userMiddleware.checkIfUserExists, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
// router.post('refresh', authController.registration); // refresh token

export const authRouter = router;
