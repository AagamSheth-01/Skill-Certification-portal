import mongoose from "mongoose";

const curriculumSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const instructorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  avatar: String,
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  fullDescription: String,
  category: String,
  image: String,
  curriculum: [curriculumSchema],
  instructor: instructorSchema,
});

export default mongoose.model("Course", courseSchema);
