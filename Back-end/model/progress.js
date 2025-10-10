// models/Progress.js
import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  completedLessons: [{ type: String }], // ✅ store lesson keys like "0-0", "0-1"
  lastAccessed: { type: Date, default: Date.now }
  
});

export default mongoose.model("Progress", ProgressSchema);
