import mongoose from "mongoose";
import { IPartnerBank } from "./partnerBank.interface";



const partnerBankSchema = new mongoose.Schema<IPartnerBank>(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bankName: { type: String, required: true },
    accountHolder: { type: String, required: true },
    accountNumber: { type: String, required: true, unique: true },
    ifscCode: { type: String, required: true, uppercase: true },
    upi: { type: String },
    status: { type: String, enum: ["added", "not_added", "verified", "rejected"], default: "not_added" },
  },
  { timestamps: true }
);

export const PartnerBank = mongoose.models.partnerBank || mongoose.model<IPartnerBank>("PartnerBank", partnerBankSchema);

