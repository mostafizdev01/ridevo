import mongoose from "mongoose";
import { IDocs } from "./partner.interface";


const partnerSchema = new mongoose.Schema<IDocs>(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    nationalId: { type: String, required: true },
    license: { type: String, required: true },
    rc: { type: String, required: true },
    status: { type: String, enum: ["approved", "pending", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

const Partner = mongoose.models.documents || mongoose.model<IDocs>("documents", partnerSchema);

export default Partner;