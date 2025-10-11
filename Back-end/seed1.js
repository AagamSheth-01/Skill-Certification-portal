import mongoose from "mongoose";
import Course from "./model/Course.js"; // adjust path
import LiveLecture from "./model/livelecture.js"; // adjust path

async function seed() {
  try {
   

    // 2️⃣ Create course
    const course = new Course({
  title: "Cloud Computing with AWS",
  fullDescription: "Learn cloud fundamentals and AWS services such as EC2, S3, and Lambda.",
  category: "Cloud & DevOps",
  image: "https://picsum.photos/300/150?random=506",
  instructor: {
    name: "Daniel White",
    bio: "Cloud Architect and AWS Certified Solutions Professional.",
    avatar: "https://picsum.photos/100/100?random=606",
  },
  curriculum: [
    {
      moduleTitle: "Module 1: AWS Basics",
      moduleDescription: "Explore AWS architecture and essential cloud services.",
      lessons: [
        {
          title: "Introduction to AWS",
          description: "Learn how AWS infrastructure works.",
          videos: [{ title: "AWS Intro", url: "http://localhost:5000/uploads/videos/test.mp4" }],
          materials: [{ title: "AWS Basics", url: "http://localhost:5000/uploads/docs/test.pdf" }],
          quiz: true,
        },
        {
          title: "Live Lecture: Deploying on AWS",
          description: "Deploy a demo app live using AWS services.",
        },
      ],
    },
  ],
}






);

    await course.save();


    // 3️⃣ Create live lecture for the second lesson
    const liveLecture = new LiveLecture({
  courseId: course._id.toString(),
  moduleIndex: 0,
  lessonIndex: 1,
  title: "Live Lecture: Deploying on AWS",
  startTime: new Date("2025-11-05T13:00:00Z"),
  endTime: new Date("2025-11-05T14:30:00Z"),
  instructorId: "daniel-white-id",
  chat: [],
}










);

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
