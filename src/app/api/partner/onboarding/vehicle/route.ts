/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { auth } from "@/src/auth";
import connectDb from "@/src/server/lib/db";
import { User } from "@/src/server/module/models/user/user.model";
import Vehicle from "@/src/server/module/models/vehicle/vehicle.model"


const VEHICLE_REGEX =  /^[A-Z]{2}[0-9]{1,2}[A-Z]{0,2}[0-9]{4}$/

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
    const {type, number, vehicleModel} = await req.json();

    console.log("type: ", type)
    console.log("number: ", number)
    console.log("vehicleModel: ", vehicleModel)

    if(!type || !number || !vehicleModel){
              return Response.json(
        { message: "missing Required details" },
        { status: 400 }
      );
    }

    // validation regex with number
    // if(!VEHICLE_REGEX.test(number)){
    //     return Response.json({
    //         message: "Invalid Vehicle Number Format",
    //         status: 400
    //     })
    // }

    const vehicleNumber = number.toUpperCase();
    const duplicate = await Vehicle.findOne({number: vehicleNumber})

    if(duplicate){
        return Response.json({
            message: "Vehicle already registered",
            status: 400
        })
    }

    let vehicle = await Vehicle.findOne({owner: session?.user.id})

    if(vehicle && vehicle == "number"){
        vehicle.type = type
        vehicle.number = vehicleNumber
        vehicle.vehicleModel = vehicleModel
        vehicle.status = "pending"
        await vehicle.save();
    }

    vehicle = await Vehicle.create({
      owner: user._id,
        type,
        number: vehicleNumber,
        vehicleModel
    })

    if(user.partnerOnBoardingSteps < 1){
        user.partnerOnBoardingSteps = 1
    }

    user.role = "partner"
    await user.save();

    return Response.json(vehicle, {status: 201})

    } catch (error) {
        return Response.json({message: `vehicle error ${error}`},
            {status: 500}
        )
    }
}

// =============>>>>>>>>>> get vehicle data =========>>>>>>>>>>>>>>
// =============>>>>>>>>>> get vehicle data =========>>>>>>>>>>>>>>

export async function GET (req: Request) {
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

    let vehicle = await Vehicle.findOne({
        owner: user._id
    })

    if(vehicle){
        return Response.json(vehicle, {status: 200})
    }else{
        return null
    }

    } catch (error) {
         return Response.json({message: `vehicle error ${error}`},
            {status: 500}
        )
    }
}