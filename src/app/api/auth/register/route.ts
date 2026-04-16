import connectDb from "@/src/server/lib/db"
import { User } from "@/src/server/module/models/user/user.model";
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { sendMail } from "@/src/server/lib/sendMail";

export const POST = async (req: NextRequest) => {
    try {
        const { name, email, password } = await req.json()
        await connectDb();
        let user = await User.findOne({ email })

        if (user && user.isEmailVerified) {
            return NextResponse.json({
                success: false,
                message: "Email already exist!",
                status: 400
            })
        }

        /// email verification
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000) // OTP valid for 10 minutes


        const hashedPassword = await bcrypt.hash(password, 10)

        if (user && !user.isEmailVerified) {
            user.name = name;
            user.password = hashedPassword;
            user.email = email;
            user.otp = otp;
            user.otpExpiresAt = otpExpiresAt;
            await user.save();
        } else {
            user = await User.create({
                name, email, password: hashedPassword, otp, otpExpiresAt
            })
        }

        /// send otp to email
        await sendMail(email,
            "Your OTP for Email Verification",
            `<p>Your OTP code is <strong>${otp}</strong>. 
             It will expire in 10 minutes.
            </p>`)

        return NextResponse.json({
            success: true,
            status: 201,
            message: "Register Successfull!",
            data: user
        })

    } catch (error) {
        console.log(error)
    }
}