import express from "express";
import LiveLecture from "../model/livelecture";
const router = express.Router();

// Schedule a live lecture (Instructor)
router.post("/", async (req, res) => {
  const lecture = new LiveLecture(req.body);
  try {
    await lecture.save();
    res.status(201).json(lecture);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all scheduled live lectures for a course
router.get("/course/:courseId", async (req, res) => {
  const lectures = await LiveLecture.find({ courseId: req.params.courseId });
  res.json(lectures);
});

// Add chat message
router.post("/:id/chat", async (req, res) => {
  const { userId, userName, message } = req.body;
  const lecture = await LiveLecture.findById(req.params.id);
  if (!lecture) return res.status(404).json({ error: "Lecture not found" });
  lecture.chat.push({ userId, userName, message });
  await lecture.save();
  res.json(lecture.chat);
});

// Get chat messages
router.get("/:id/chat", async (req, res) => {
  const lecture = await LiveLecture.findById(req.params.id);
  if (!lecture) return res.status(404).json({ error: "Lecture not found" });
  res.json(lecture.chat);
});

export default router;
