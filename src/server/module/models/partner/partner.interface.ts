import mongoose from "mongoose";


export interface IPartner {
  owner: mongoose.Types.ObjectId;
  nationalId: string;
  rc: string;
  license: string;
  status: "approved" | "pending" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}