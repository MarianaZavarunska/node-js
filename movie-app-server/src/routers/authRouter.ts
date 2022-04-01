import { Router } from 'express';

import { authController } from '../controllers/auth.controller';
import { authMiddleware, userMiddleware } from '../middlewares';
import { authValidationMiddleware } from '../middlewares/vaildation/auth.validation.middleware';

const router = Router();

router.post('/registration', authValidationMiddleware.validateRegisterUser, authController.registration);
router.post('/login', authValidationMiddleware.validateLoginUser, userMiddleware.checkIfUserExists, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

router.post('/forgotPassword', authValidationMiddleware.checkValidEmail, userMiddleware.checkIfUserExists, authController.sendForgotPassword);
router.post('/forgotPassword/set', authValidationMiddleware.checkValidPassword, authMiddleware.checkActionToken, authController.setPassword);

export const authRouter = router;
