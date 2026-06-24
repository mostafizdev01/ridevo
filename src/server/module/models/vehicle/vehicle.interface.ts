import mongoose from "mongoose";

type VehicleType = "Bikes" | "Helicopters" | "Cars" | "Vans" | "Trucks" | "Electric" | "Cycles" | "loading" | "auto";


export interface IVehicle {
  owner: mongoose.Types.ObjectId;
  type: VehicleType;
  vehicleModel: string;
  number: string;
  image?: string;
  pricePerKm?: number;
  waitingCharge?: number;
  status: "approved" | "pending" | "rejected";
  rejectionReason?: string;
  isAction: boolean;
  createdAt: Date;
  updatedAt: Date;
}