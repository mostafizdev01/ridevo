import connectDb from "@/src/server/lib/db";
import { User } from "@/src/server/module/models/user/user.model";

export async function POST(req: Request) {
    try {
        await connectDb();
        const { email, otp } = await req.json();

        if(!email || !otp) {
            return Response.json({
                success: false,
                message: "Email and OTP are required!",
                status: 400
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return Response.json({
                success: false,
                message: "User not found!",
                status: 404
            });
        }

        if (user.isEmailVerified) {
            return Response.json({
                success: false,
                message: "Email already verified!",
                status: 400
            });
        }

        if (user.otp !== otp ) { // user provided otp doesn't match
            return Response.json({
                success: false,
                message: "Invalid OTP!",
                status: 400
            });
        }

        if (user.otpExpiresAt! < new Date()) {
            return Response.json({
                success: false,
                message: "Expired OTP!",
                status: 400
            });
        }

        user.isEmailVerified = true;
        user.otp = undefined;
        user.otpExpiresAt = undefined;
        await user.save();

        return Response.json({
            success: true,
            status: 200,
            message: "Email verified successfully!"
        });
        

    } catch (error) {
        return Response.json({
            success: false,
            message: `Verification failed! ${error}`,
            status: 500
        });
    }
}