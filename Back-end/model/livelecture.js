import mongoose from "mongoose";

const LiveLectureSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  moduleIndex: { type: Number, required: true },
  lessonIndex: { type: Number, required: true },
  title: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  instructorId: { type: String, required: true },
  chat: [
    {
      userId: String,
      userName: String,
      message: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("LiveLecture", LiveLectureSchema);
