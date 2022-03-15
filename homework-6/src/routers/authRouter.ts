import { Router } from 'express';

import { authController } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/registration', authController.registration);
// router.post('/login', authController.registration);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
// router.post('refresh', authController.registration); // refresh token

export const authRouter = router;