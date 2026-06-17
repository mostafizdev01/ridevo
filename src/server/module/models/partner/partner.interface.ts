import mongoose from "mongoose";


export interface IPartner {
  owner: mongoose.Types.ObjectId;
  url: string;
  rcUrl: string;
  licenseNumber: string;
  status: "approved" | "pending" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}