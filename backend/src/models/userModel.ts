import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    phone: string;
    password: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);
