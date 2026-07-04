import { auth } from "@/src/auth";
import connectDb from "@/src/server/lib/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDb()
        const session = await auth()

        if(!session || !session.user?.email || session.user.role !== "admin"){
            return Response.json({
                message: "Unauthorize access!",
                status: 403
            })
        }
    } catch (error) {
        console.log("error: ", error)
    }
}