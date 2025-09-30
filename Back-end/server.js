import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/coureses.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Sample courses data
let courses = [
  { id: 1, title: "React for Beginners", description: "Build modern web apps with React and Tailwind CSS.", image: "https://picsum.photos/300/150?random=1" },
  { id: 2, title: "Python for Data Science", description: "Analyze data and gain insights using Python.", image: "https://picsum.photos/300/150?random=2" },
  { id: 3, title: "JavaScript Essentials", description: "Master the fundamentals of JavaScript for web development.", image: "https://picsum.photos/300/150?random=3" },
  { id: 4, title: "Machine Learning with Python", description: "Learn to build predictive models using scikit-learn and TensorFlow.", image: "https://picsum.photos/300/150?random=4" },
  { id: 5, title: "Node.js & Express Bootcamp", description: "Create scalable server-side applications with Node.js and Express.", image: "https://picsum.photos/300/150?random=5" },
  { id: 6, title: "Full-Stack Development", description: "Become a full-stack developer with React, Node.js, and MongoDB.", image: "https://picsum.photos/300/150?random=6" },
];

// Courses endpoints
app.get("/api/courses", (req, res) => res.json(courses));

app.post("/api/courses", (req, res) => {
  const { title, description, image } = req.body;
  const newCourse = { id: Date.now(), title, description, image };
  courses.push(newCourse);
  res.json(newCourse);
});
// courses route
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json(course);
});

app.use("/api/courses", courseRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});


