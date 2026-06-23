import mongoose from "mongoose";
import { IVehicle } from "./vehicle.interface";


const vehicleSchema = new mongoose.Schema<IVehicle>(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["bike", "car", "truck", "loading", "auto"], required: true },
    vehicleModel: { type: String, required: true },
    number: { type: String, required: true },
    image: { type: String },
    pricePerKm: { type: Number, required: true },
    waitingCharge: { type: Number, required: true },
    status: { type: String, enum: ["approved", "pending", "rejected"], default: "pending" },
    rejectionReason: { type: String },
    isAction: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Vehicle = mongoose.models.Vehicle || mongoose.model<IVehicle>("Vehicle", vehicleSchema);

export default Vehicle;