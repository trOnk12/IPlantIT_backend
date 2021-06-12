import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    email: string;
    password: string;
};

const userSchema = new mongoose.Schema<UserDocument>(
    {
        email: { type: String, unique: true },
        password: String,
    }
);

export const User = mongoose.model<UserDocument>("User", userSchema);
