import express from 'express';
import { register, login, requestPasswordReset, resetPasswordController } from '../controllers/authController';

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPasswordController);

export default router;