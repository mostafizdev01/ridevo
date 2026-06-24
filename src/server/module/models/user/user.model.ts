import mongoose, { Document } from "mongoose";

export interface IUser extends Document{
    name: string;
    email: string;
    password?: string;
    role: "user" | "partner" | "admin";
    isEmailVerified?: boolean;
    mobileNumber: string;
    partnerOnBoardingSteps: 1 | 2 | 3;
    otp?: string;
    otpExpiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    mobileNumber: {
        type: String,
    },
    partnerOnBoardingSteps: {
        type: Number,
        default: 1
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "partner", "admin"]
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String
    },
    otpExpiresAt: {
        type: Date
    }

}, {timestamps: true})

export const User = mongoose.models.User || mongoose.model("User", userSchema); // Once you've been to Create, you don't be Create again User model.