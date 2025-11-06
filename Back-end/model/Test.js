import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }], // multiple options
  correctAnswer: { type: Number, required: true }, // index of correct option
});

const testSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  questions: [questionSchema],
  totalMarks: { type: Number, default: 10 },
});

export default mongoose.model("Test", testSchema);
