import connectDb from "@/src/server/lib/db"
import { User } from "@/src/server/module/models/user/user.model";
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export const POST = async (req: NextRequest) => {
    try {
        const { name, email, password } = await req.json()
        await connectDb();
        let user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({
                success: false,
                message: "Email already exist!",
                status: 400
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        user=await User.create({
            name, email, password: hashedPassword
        })

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