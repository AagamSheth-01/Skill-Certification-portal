import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./model/Course.js";
import LiveLecture from "./model/livelecture.js";

dotenv.config();

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🟢 MongoDB connected");

    // Clear old data
    await Course.deleteMany({});
    await LiveLecture.deleteMany({});
    console.log("🧹 Previous data cleared");

    // =============================
    // ⿡ AI Course
    // =============================
    const courseAI = new Course({
      title: "Artificial Intelligence Fundamentals",
      fullDescription:
        "Learn the core concepts of Artificial Intelligence including machine learning, neural networks, and real-world AI applications.",
      category: "AI & Machine Learning",
      image: "https://picsum.photos/300/150?random=101",
      instructor: {
        name: "Sophia Turner",
        bio: "AI Engineer and Data Scientist with expertise in machine learning models.",
        avatar: "https://picsum.photos/100/100?random=201",
      },
      curriculum: [
        {
          moduleTitle: "Module 1: Introduction to AI",
          moduleDescription: "Understand what AI is and how it works.",
          lessons: [
            {
              title: "Understanding AI Concepts",
              description: "Explore AI fundamentals and real-world examples.",
              videos: [
                { title: "AI Overview", url: "http://localhost:5000/uploads/videos/test.mp4" },
              ],
              materials: [
                { title: "AI Basics PDF", url: "http://localhost:5000/uploads/docs/test.pdf" },
              ],
              quiz: true,
            },
            {
              title: "Live Lecture: AI in Action",
              description: "Live demo of AI-powered tools.",
            },
          ],
        },
      ],
    });

    await courseAI.save();

    const liveAI = new LiveLecture({
      courseId: courseAI._id.toString(),
      moduleIndex: 0,
      lessonIndex: 1,
      title: "Live Lecture: AI in Action",
      startTime: new Date("2025-11-01T14:00:00Z"),
      endTime: new Date("2025-11-01T15:30:00Z"),
      instructorId: "sophia-turner-id",
      chat: [],
    });

    await liveAI.save();

    courseAI.curriculum[0].lessons[1].liveLectureId = liveAI._id.toString();
    await courseAI.save();

    // =============================
    // Repeat similar for other courses (AWS, FullStack, React, Python, UI/UX)
    // Example for AWS:
    const courseAWS = new Course({
      title: "Cloud Computing with AWS",
      fullDescription:
        "Learn cloud fundamentals and AWS services such as EC2, S3, and Lambda.",
      category: "Cloud & DevOps",
      image: "https://picsum.photos/300/150?random=102",
      instructor: {
        name: "Daniel White",
        bio: "Cloud Architect and AWS Certified Solutions Professional.",
        avatar: "https://picsum.photos/100/100?random=202",
      },
      curriculum: [
        {
          moduleTitle: "Module 1: AWS Basics",
          moduleDescription: "Explore AWS architecture and essential cloud services.",
          lessons: [
            {
              title: "Introduction to AWS",
              description: "Learn how AWS infrastructure works.",
              videos: [
                { title: "AWS Intro", url: "http://localhost:5000/uploads/videos/test.mp4" },
              ],
              materials: [
                { title: "AWS Basics", url: "http://localhost:5000/uploads/docs/test.pdf" },
              ],
              quiz: true,
            },
            {
              title: "Live Lecture: Deploying on AWS",
              description: "Deploy a demo app live using AWS services.",
            },
          ],
        },
      ],
    });

    await courseAWS.save();

    const liveAWS = new LiveLecture({
      courseId: courseAWS._id.toString(),
      moduleIndex: 0,
      lessonIndex: 1,
      title: "Live Lecture: Deploying on AWS",
      startTime: new Date("2025-11-05T13:00:00Z"),
      endTime: new Date("2025-11-05T14:30:00Z"),
      instructorId: "daniel-white-id",
      chat: [],
    });

    await liveAWS.save();
    courseAWS.curriculum[0].lessons[1].liveLectureId = liveAWS._id.toString();
    await courseAWS.save();

    console.log("✅ All courses seeded successfully!");

    // Close MongoDB connection
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    await mongoose.disconnect();
  }
}

// Run seed
seed();
