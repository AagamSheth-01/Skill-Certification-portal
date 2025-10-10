import mongoose from "mongoose";
import Course from "./model/Course"; // adjust path
import LiveLecture from "./model/livelecture"; // adjust path

async function seed() {
  try {
    // 1️⃣ Clear previous data
    await Course.deleteMany({});
    await LiveLecture.deleteMany({});

    // 2️⃣ Create course
    const course = new Course({
      title: "Full Stack Development Basics",
      fullDescription: "Test course with local video, PDF, and live lecture.",
      category: "Web Development",
      image: "https://picsum.photos/300/150?random=101",
      instructor: {
        name: "John Doe",
        bio: "Full Stack Developer and Mentor.",
        avatar: "https://picsum.photos/100/100?random=201",
      },
      curriculum: [
        {
          moduleTitle: "Module 1: Getting Started",
          moduleDescription: "Setup and introduction.",
          lessons: [
            {
              title: "Introduction to Full Stack",
              description: "Overview of front-end and back-end development.",
              videos: [
                { title: "Intro Video", url: "http://localhost:5000/uploads/videos/test.mp4" }
              ],
              materials: [
                { title: "Course Notes", url: "http://localhost:5000/uploads/docs/test.pdf" }
              ],
              quiz: true,
            },
            {
              title: "Live Lecture Session",
              description: "Scheduled live Q&A session.",
              // link liveLectureId later
            },
          ],
        },
      ],
    });

    await course.save();

    // 3️⃣ Create live lecture for the second lesson
    const liveLecture = new LiveLecture({
      courseId: course._id.toString(),
      moduleIndex: 0,
      lessonIndex: 1, // second lesson
      title: "Kickoff Live Session",
      startTime: new Date("2025-10-05T15:00:00Z"),
      endTime: new Date("2025-10-05T16:00:00Z"),
      instructorId: "john-doe-id", // can use a dummy string or user ID
      chat: [],
    });

    await liveLecture.save();

    // 4️⃣ Update course lesson to include liveLectureId
    course.curriculum[0].lessons[1].liveLectureId = liveLecture._id.toString();
    await course.save();

    console.log("✅ Seed completed!");
    console.log("Course ID:", course._id.toString());
    console.log("LiveLecture ID:", liveLecture._id.toString());
  } catch (err) {
    console.error("❌ Seed failed:", err);
  }
}

export default seed;
