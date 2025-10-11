import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  certificateUrl: { type: String, required: true }, // PDF path or URL
  dateIssued: { type: Date, default: Date.now },
});

export default mongoose.model("Certificate", certificateSchema);
