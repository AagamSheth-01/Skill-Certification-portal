import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
  title: String,
  description: String,
  videos: [
    {
      title: String,
      url: String,
    },
  ],
  materials: [
    {
      title: String,
      url: String,
    },
  ],
  quiz: { type: Boolean, default: false },
});

const ModuleSchema = new mongoose.Schema({
  moduleTitle: String,
  moduleDescription: String,
  lessons: [LessonSchema],
});

const InstructorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  avatar: String,
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  fullDescription: String,
  category: String,
  image: String,
  curriculum: [ModuleSchema],
  instructor: InstructorSchema,
  liveLectureId: { type: mongoose.Schema.Types.ObjectId, ref: "LiveLecture" },


});
export default mongoose.model("Course", CourseSchema);