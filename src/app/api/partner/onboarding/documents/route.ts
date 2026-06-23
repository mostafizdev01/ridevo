/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from "@/src/auth";
import uploadOnCloudinary from "@/src/server/lib/cloudinary";
import connectDb from "@/src/server/lib/db";
import Partner from "@/src/server/module/models/partner/partnerDocs.model";
import { User } from "@/src/server/module/models/user/user.model";

export async function POST(req: Request) {
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

    /// get data in request data
    const formdata = await req.formData();
    const nationalId = formdata.get("nationalId") as Blob | null
    const license = formdata.get("license") as Blob | null
    const rc = formdata.get("rc") as Blob | null

    if(!nationalId || !license || !rc){
         return Response.json(
        { message: "All documents are required" },
        { status: 400 }
      );
    }

    const updatePayload = {
        status: "pending",
        nationalId: "",
        license: "",
        rc: "",
    }

    if(nationalId){
        const url = await uploadOnCloudinary(nationalId)
        if(!url){
             return Response.json(
        { message: "NationalID upload failed" },
        { status: 400 }
         );
        }

        updatePayload.nationalId = url
    }

    if(license){
        const url = await uploadOnCloudinary(license)
        if(!url){
             return Response.json(
        { message: "Licence upload failed" },
        { status: 400 }
         );
        }

        updatePayload.license = url
    }

    if(rc){
        const url = await uploadOnCloudinary(rc)
        if(!url){
             return Response.json(
        { message: "Rc upload failed" },
        { status: 400 }
         );
        }

        updatePayload.rc = url
    }

    const partnerDocs = await Partner.findOneAndUpdate(
        {owner: user._id},
        {$set: updatePayload},
        {upsert: true, new: true},
    )

    if(user.partnerOnBoardingSteps < 2){
        user.partnerOnBoardingSteps = 2
    }

    await user.save()

    return Response.json(partnerDocs, {
        status: 201
    })

    } catch (error) {
        return Response.json({message: `partnerdocs error ${error}`},
            {status: 500}
        )
    }
}

// =======>>>>> Get partnerDoc info ===========>>>>>>>>>>>
// =======>>>>> Get partnerDoc info ===========>>>>>>>>>>>

export async function GET(req:Request){
    console.log("vehicle documents data: ", req.body);
    
}