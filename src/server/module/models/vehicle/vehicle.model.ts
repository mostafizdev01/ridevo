import mongoose from "mongoose";
import { IVehicle } from "./vehicle.interface";


const vehicleSchema = new mongoose.Schema<IVehicle>(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["Bikes", "Helicopters", "Cars", "Vans", "Trucks", "Electric", "Cycles", "loading", "auto"], required: true },
    vehicleModel: { type: String, required: true },
    number: { type: String, required: true },
    image: { type: String },
    pricePerKm: { type: Number },
    waitingCharge: { type: Number },
    status: { type: String, enum: ["approved", "pending", "rejected"], default: "pending" },
    rejectionReason: { type: String },
    isAction: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Vehicle = mongoose.models.Vehicle || mongoose.model<IVehicle>("Vehicle", vehicleSchema);

export default Vehicle;