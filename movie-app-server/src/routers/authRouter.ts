import { Router } from 'express';

import { authController } from '../controllers/auth.controller';
import { authMiddleware, userMiddleware } from '../middlewares';
import { authValidationMiddleware } from '../middlewares/vaildation/auth.validation.middleware';

const router = Router();

router.post('/registration', authValidationMiddleware.validateRegisterUser, authController.registration);
router.post('/login', userMiddleware.checkIfUserExists, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authController.refreshToken);

export const authRouter = router;
