import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: String,
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
});

export default mongoose.model("User", userSchema);
