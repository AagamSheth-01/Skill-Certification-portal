import mongoose from "mongoose";
import dotenv from "dotenv";
import Test from "./model/Test.js";
import Course from "./model/Course.js";

dotenv.config();

const seedTests = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

        await Test.deleteMany();
        console.log("tests delted")

    // Find any existing course
    const course = await Course.findOne();
    if (!course) {
      console.log("❌ No course found. Please seed courses first.");
      process.exit(1);
    }

    // Test Data (10 questions)
    const testData = {
      courseId: course._id,
      totalMarks: 10,
      questions: [
        {
          questionText: "Which of the following best describes React?",
          options: [
            "A database system",
            "A JavaScript library for building UIs",
            "A CSS preprocessor",
            "A backend framework",
          ],
          correctAnswer: 1,
        },
        {
          questionText: "What does MERN stand for?",
          options: [
            "MongoDB, Express, React, Node",
            "MySQL, Ember, Redux, Next",
            "Mongo, Electron, React, Nest",
            "MongoDB, Express, Ruby, Node",
          ],
          correctAnswer: 0,
        },
        {
          questionText: "Which hook is used to manage state in React?",
          options: ["useData", "useEffect", "useState", "useFetch"],
          correctAnswer: 2,
        },
        {
          questionText: "What is JSX?",
          options: [
            "A template language for Node.js",
            "A syntax extension for JavaScript",
            "A CSS framework",
            "A database query language",
          ],
          correctAnswer: 1,
        },
        {
          questionText: "Which command is used to create a React app?",
          options: [
            "npx create-react-app",
            "npm install react",
            "react new app",
            "npm run react-app",
          ],
          correctAnswer: 0,
        },
        {
          questionText: "What is Express used for?",
          options: [
            "Building APIs and server-side logic",
            "Designing UI components",
            "Handling database queries directly",
            "Creating React components",
          ],
          correctAnswer: 0,
        },
        {
          questionText: "Which database is used in MERN stack?",
          options: ["MySQL", "PostgreSQL", "MongoDB", "Firebase"],
          correctAnswer: 2,
        },
        {
          questionText: "Which HTTP method is used to update data?",
          options: ["GET", "POST", "PUT", "DELETE"],
          correctAnswer: 2,
        },
        {
          questionText: "Which keyword is used to define a constant in JavaScript?",
          options: ["var", "let", "const", "static"],
          correctAnswer: 2,
        },
        {
          questionText: "Which hook runs after a component mounts?",
          options: ["useData", "useEffect", "useLayoutEffect", "useMemo"],
          correctAnswer: 1,
        },
      ],
    };

    // Clear existing test for this course
    await Test.deleteMany({ courseId: course._id });

    // Insert new test
    const createdTest = await Test.create(testData);
    console.log(`✅ Test inserted for course: ${course.title}`);
    console.log(`🧩 Test ID: ${createdTest._id}`);

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding test:", error);
    process.exit(1);
  }
};

seedTests();
