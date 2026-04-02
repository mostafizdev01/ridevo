import connectDb from "@/src/server/lib/db"
import { NextRequest } from "next/server"

export const post = async(req:NextRequest)=> {
    try {
        const {name, email, password} = await req.json()
        await connectDb();
        const user = await 
    } catch (error) {
        
    }
}