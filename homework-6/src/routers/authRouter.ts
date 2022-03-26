import { Router } from 'express';

import { authController } from '../controllers/authController';
import { authMiddleware, userMiddleware } from '../middlewares';

const router = Router();

router.post('/login', userMiddleware.validateLoginUser, userMiddleware.checkIfUserExists, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken); // refresh token

export const authRouter = router;
