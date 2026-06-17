import mongoose from "mongoose";
import { IPartner } from "./partner.interface";


const partnerSchema = new mongoose.Schema<IPartner>(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    url: { type: String, required: true },
    rcUrl: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    status: { type: String, enum: ["approved", "pending", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

const Partner = mongoose.models.partner || mongoose.model<IPartner>("Partner", partnerSchema);

export default Partner;