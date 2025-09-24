
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors()); 
app.use(express.json());

let courses = [
  {
    id: 1,
    title: "React for Beginners",
    description: "Build modern web apps with React and Tailwind CSS.",
    image: "https://picsum.photos/300/150?random=1"
  },
  {
    id: 2,
    title: "Python for Data Science",
    description: "Analyze data and gain insights using Python.",
    image: "https://picsum.photos/300/150?random=2"
  },
  {
    id: 3,
    title: "JavaScript Essentials",
    description: "Master the fundamentals of JavaScript for web development.",
    image: "https://picsum.photos/300/150?random=3"
  },
  {
    id: 4,
    title: "Machine Learning with Python",
    description: "Learn to build predictive models using scikit-learn and TensorFlow.",
    image: "https://picsum.photos/300/150?random=4"
  },
  {
    id: 5,
    title: "Node.js & Express Bootcamp",
    description: "Create scalable server-side applications with Node.js and Express.",
    image: "https://picsum.photos/300/150?random=5"
  },
  {
    id: 6,
    title: "Full-Stack Development",
    description: "Become a full-stack developer with React, Node.js, and MongoDB.",
    image: "https://picsum.photos/300/150?random=6"
  }
];


// GET all courses
app.get("/api/courses", (req, res) => {
  res.json(courses);
});

// POST new course
app.post("/api/courses", (req, res) => {
  const { title, description, image } = req.body;
  const newCourse = { id: Date.now(), title, description, image };
  courses.push(newCourse);
  res.json(newCourse);
});

app.listen(5000, () => console.log("Server running on port 5000"));
