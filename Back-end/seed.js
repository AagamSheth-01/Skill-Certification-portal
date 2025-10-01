import mongoose from "mongoose";
import Course from "./model/Course.js";
import courses from "./controller/courses.js";

async function seedDB() {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect("mongodb://127.0.0.1:27017/upskill", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected ✅");

    // 2. Insert new courses without deleting old ones
    await Course.insertMany(courses);
    console.log("New courses inserted ✅");

    // 3. Close connection
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seedDB();
