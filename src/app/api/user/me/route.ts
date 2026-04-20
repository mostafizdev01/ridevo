import { auth } from "@/src/auth";
import connectDb from "@/src/server/lib/db";
import { User } from "@/src/server/module/models/user/user.model";

export async function GET(req: Request) {
    try {
        await connectDb();
        const session = await auth();
        if (!session || !session?.user) {
            return Response.json({ message: "Unauthorized access" }
                , { status: 401 })
        }

        const user = await User.findOne({ email: session.user.email }).select("-password -otp -otpExpiresAt");

        if (!user) {
            return Response.json({ message: "User not found" }, { status: 404 });
        }

        return Response.json({ user }, { status: 200 });

    } catch (error) {
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}