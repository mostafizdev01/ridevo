import mongoose from "mongoose";


export interface IPartnerBank {
  owner: mongoose.Types.ObjectId;
  bankName?: string;
  accountHolder: string;
  accountNumber: string;
  ifsc: string;
  mobileNumber: number;
  upi?: string;
  status: "added" | "not_added" | "verified" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}