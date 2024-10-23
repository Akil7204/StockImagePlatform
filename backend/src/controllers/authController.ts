import { Request, Response } from 'express';
import { registerUser, loginUser, resetPasswordRequest, resetPassword } from '../services/authService';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body;
        console.log(email, username, password );
        
        const token = await registerUser(email, username, password);
        res.status(201).json({ token });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const token = await loginUser(email, password);
        res.status(200).json({ token });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const requestPasswordReset = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const resetToken = await resetPasswordRequest(email);
        res.status(200).json({ message: `Reset token: ${resetToken}` });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const resetPasswordController = async (req: Request, res: Response) => {
    try {
        const { token, newPassword } = req.body;
        await resetPassword(token, newPassword);
        res.status(200).json({ message: 'Password reset successful' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
