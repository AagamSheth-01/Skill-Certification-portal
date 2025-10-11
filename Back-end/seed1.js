import mongoose from "mongoose";
import Course from "./model/Course.js";
import LiveLecture from "./model/livelecture.js";

async function seed() {
  try {
    // 🧹 Clear old data
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
              videos: [{ title: "AI Overview", url: "http://localhost:5000/uploads/videos/test.mp4" }],
              materials: [{ title: "AI Basics PDF", url: "http://localhost:5000/uploads/docs/test.pdf" }],
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
    // ⿢ AWS Course
    // =============================
    const courseAWS = new Course({
      title: "Cloud Computing with AWS",
      fullDescription: "Learn cloud fundamentals and AWS services such as EC2, S3, and Lambda.",
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

    // =============================
    // ⿣ Full Stack Course
    // =============================
    const courseFS = new Course({
      title: "Full Stack Web Development",
      fullDescription:
        "Master both frontend and backend web development using React, Node.js, Express, and MongoDB.",
      category: "Web Development",
      image: "https://picsum.photos/300/150?random=103",
      instructor: {
        name: "John Doe",
        bio: "Full Stack Developer and Mentor with 8+ years of experience.",
        avatar: "https://picsum.photos/100/100?random=203",
      },
      curriculum: [
        {
          moduleTitle: "Module 1: Frontend & Backend Basics",
          moduleDescription: "Get started with the MERN stack.",
          lessons: [
            {
              title: "What is Full Stack Development?",
              description: "Overview of frontend and backend integration.",
              videos: [{ title: "Full Stack Intro", url: "http://localhost:5000/uploads/videos/test.mp4" }],
              materials: [{ title: "Full Stack Notes", url: "http://localhost:5000/uploads/docs/test.pdf" }],
              quiz: true,
            },
            {
              title: "Live Lecture: Building Full Stack Apps",
              description: "Live demo of a complete MERN app.",
            },
          ],
        },
      ],
    });

    await courseFS.save();

    const liveFS = new LiveLecture({
      courseId: courseFS._id.toString(),
      moduleIndex: 0,
      lessonIndex: 1,
      title: "Live Lecture: Building Full Stack Apps",
      startTime: new Date("2025-11-07T15:00:00Z"),
      endTime: new Date("2025-11-07T16:30:00Z"),
      instructorId: "john-doe-id",
      chat: [],
    });
    await liveFS.save();
    courseFS.curriculum[0].lessons[1].liveLectureId = liveFS._id.toString();
    await courseFS.save();

    // =============================
    // ⿤ React Course
    // =============================
    const courseReact = new Course({
      title: "Frontend Development with React",
      fullDescription:
        "Learn how to build modern and dynamic web interfaces using React.js, hooks, and state management.",
      category: "Frontend",
      image: "https://picsum.photos/300/150?random=104",
      instructor: {
        name: "Michael Lee",
        bio: "Frontend Developer with 6+ years of experience in React and Redux.",
        avatar: "https://picsum.photos/100/100?random=204",
      },
      curriculum: [
        {
          moduleTitle: "Module 1: React Fundamentals",
          moduleDescription: "Components, Props, and State.",
          lessons: [
            {
              title: "React Basics",
              description: "Learn about React components and hooks.",
              videos: [{ title: "React Intro", url: "http://localhost:5000/uploads/videos/test.mp4" }],
              materials: [{ title: "React Notes", url: "http://localhost:5000/uploads/docs/test.pdf" }],
              quiz: true,
            },
            {
              title: "Live Lecture: Building with React",
              description: "Live demo on creating a small React project.",
            },
          ],
        },
      ],
    });

    await courseReact.save();

    const liveReact = new LiveLecture({
      courseId: courseReact._id.toString(),
      moduleIndex: 0,
      lessonIndex: 1,
      title: "Live Lecture: Building with React",
      startTime: new Date("2025-11-09T10:00:00Z"),
      endTime: new Date("2025-11-09T11:30:00Z"),
      instructorId: "michael-lee-id",
      chat: [],
    });
    await liveReact.save();
    courseReact.curriculum[0].lessons[1].liveLectureId = liveReact._id.toString();
    await courseReact.save();

    // =============================
    // ⿥ Python Course
    // =============================
    const coursePython = new Course({
      title: "Python Programming Basics",
      fullDescription:
        "Learn Python programming from scratch including syntax, loops, functions, and basic data structures.",
      category: "Programming",
      image: "https://picsum.photos/300/150?random=105",
      instructor: {
        name: "John Smith",
        bio: "Software Engineer and Python Instructor with 7 years of experience.",
        avatar: "https://picsum.photos/100/100?random=205",
      },
      curriculum: [
        {
          moduleTitle: "Module 1: Getting Started with Python",
          moduleDescription: "Learn Python syntax and data types.",
          lessons: [
            {
              title: "Introduction to Python",
              description: "Getting started with Python and writing your first script.",
              videos: [{ title: "Python Intro", url: "http://localhost:5000/uploads/videos/test.mp4" }],
              materials: [{ title: "Python Basics", url: "http://localhost:5000/uploads/docs/test.pdf" }],
              quiz: true,
            },
            {
              title: "Live Lecture: Python Practice",
              description: "Live coding session for Python beginners.",
            },
          ],
        },
      ],
    });

    await coursePython.save();

    const livePython = new LiveLecture({
      courseId: coursePython._id.toString(),
      moduleIndex: 0,
      lessonIndex: 1,
      title: "Live Lecture: Python Practice",
      startTime: new Date("2025-11-12T11:00:00Z"),
      endTime: new Date("2025-11-12T12:30:00Z"),
      instructorId: "john-smith-id",
      chat: [],
    });
    await livePython.save();
    coursePython.curriculum[0].lessons[1].liveLectureId = livePython._id.toString();
    await coursePython.save();

    // =============================
    // ⿦ UI/UX Design Course
    // =============================
    const courseUIUX = new Course({
      title: "UI/UX Design Fundamentals",
      fullDescription:
        "Understand the principles of user experience and design intuitive user interfaces using Figma.",
      category: "Design",
      image: "https://picsum.photos/300/150?random=106",
      instructor: {
        name: "Ava Patel",
        bio: "UI/UX Designer with 5 years of experience in web and mobile design.",
        avatar: "https://picsum.photos/100/100?random=206",
      },
      curriculum: [
        {
          moduleTitle: "Module 1: Design Basics",
          moduleDescription: "Learn user-centered design and layout principles.",
          lessons: [
            {
              title: "Introduction to UI/UX",
              description: "Understanding the difference between UI and UX.",
              videos: [{ title: "UI/UX Intro", url: "http://localhost:5000/uploads/videos/test.mp4" }],
              materials: [{ title: "UI/UX Notes", url: "http://localhost:5000/uploads/docs/test.pdf" }],
              quiz: true,
            },
            {
              title: "Live Lecture: Figma Workshop",
              description: "Hands-on Figma design session.",
            },
          ],
        },
      ],
    });

    await courseUIUX.save();

    const liveUIUX = new LiveLecture({
      courseId: courseUIUX._id.toString(),
      moduleIndex: 0,
      lessonIndex: 1,
      title: "Live Lecture: Figma Workshop",
      startTime: new Date("2025-11-15T14:00:00Z"),
      endTime: new Date("2025-11-15T15:30:00Z"),
      instructorId: "ava-patel-id",
      chat: [],
    });
    await liveUIUX.save();
    courseUIUX.curriculum[0].lessons[1].liveLectureId = liveUIUX._id.toString();
    await courseUIUX.save();

    console.log("✅ All 6 courses seeded successfully!");
  } catch (err) {
    console.error("❌ Seed failed:", err);
  }
}

export default seed;