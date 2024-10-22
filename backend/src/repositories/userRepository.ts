import { User, IUser } from '../models/userModel';

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
    return User.findOne({ email });
};

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
    const user = new User(userData);
    return user.save();
};

export const findUserByResetToken = async (token: string): Promise<IUser | null> => {
    return User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: new Date() } });
};

export const updateUser = async (id: string, updates: Partial<IUser>): Promise<IUser | null> => {
    return User.findByIdAndUpdate(id, updates, { new: true });
};
