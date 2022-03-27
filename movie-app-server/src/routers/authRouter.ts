import { Router } from 'express';

import { authController } from '../controllers/auth.controller';

const router = Router();

router.post('/registration', authController.registration);
router.post('/login');
router.post('/logout');
router.post('/refresh');

export const authRouter = router;
