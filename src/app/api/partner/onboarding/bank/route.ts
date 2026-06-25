/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from "@/src/auth";
import connectDb from "@/src/server/lib/db";
import { Bank } from "@/src/server/module/models/partner/partnerBank.model";
import { User } from "@/src/server/module/models/user/user.model";
import { NextRequest } from "next/server";

export async function POST(req:Request){
    try {
         await connectDb();

    const session = await auth();

    if (!session || !session.user?.email) {
      return Response.json(
        { message: "unauthorized" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      email: session?.user?.email,
    });

    if (!user) {
      return Response.json(
        { message: "user not found" },
        { status: 400 }
      );
    }

    // write bank details statements

    const {accountHolder,accountNumber, upi, ifsc, mobileNumber} = await req.json()

    if(!accountHolder || !accountNumber || !ifsc || !mobileNumber){
        return Response.json({
          success: false,
          message: "All fields are required!",
          status: 400
        })
    }

    const partnerBank = await Bank.findOneAndUpdate({owner: user._id},
        {
            accountHolder,
            accountNumber,
            ifsc,
            mobileNumber,
            upi,
            status: "added"
        },
        {upsert: true, new: true}
    )

    user.mobileNumber = mobileNumber;

    if(user.partnerOnBoardingSteps < 3){
        user.partnerOnBoardingSteps = 3
    }

    user.save()

    return Response.json({success: true, data:partnerBank}, {
        status: 201
    })

    } catch (error) {
        return Response.json({
            message:  `partner bank error: ${error}`,
            status: 500
        })
    }
}

/// ==========>>>>>>> get bank data submit =============>>>>>>>>>>>>>>
/// ==========>>>>>>> get bank data submit =============>>>>>>>>>>>>>>

export async function GET(req: NextRequest){
    try {
         await connectDb();

    const session = await auth();

    if (!session || !session.user?.email) {
      return Response.json(
        { message: "unauthorized" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      email: session?.user?.email,
    });

    if (!user) {
      return Response.json(
        { message: "user not found" },
        { status: 400 }
      );
    }

    const partnerBank = await Bank.findOne({owner: user._id})

    if(partnerBank){
        return Response.json(partnerBank, {status: 200})
    }else{
        return null
    }

    } catch (error) {
        return Response.json({
            message: `Get partner bank error: ${error}`,
            status: 500
        })
    }
}