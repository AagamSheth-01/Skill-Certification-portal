import express from "express";
import Progress from "../model/progress.js";
import authMiddleware from "../middleware/authentication.js";

const router = express.Router();

// Get progress for a course
router.get("/:courseId", authMiddleware, async (req, res) => {
  const progress = await Progress.findOne({
    userId: req.user.id,
    courseId: req.params.courseId,
  });
  res.json(progress || { completedLessons: [] });
});

// Mark lesson as complete
router.post("/:courseId", authMiddleware, async (req, res) => {
  const { lessonKey } = req.body; // must match frontend

  if (!lessonKey || typeof lessonKey !== "string") {
    return res.status(400).json({ error: "lessonKey must be a string" });
  }

  let progress = await Progress.findOne({
    userId: req.user.id,
    courseId: req.params.courseId,
  });

  if (!progress) {
    progress = new Progress({
      userId: req.user.id,
      courseId: req.params.courseId,
      completedLessons: [lessonKey],
    });
  } else {
    if (!progress.completedLessons.includes(lessonKey)) {
      progress.completedLessons.push(lessonKey);
    }
  }

  await progress.save();
  res.json({ completedLessons: progress.completedLessons });
});


export default router;
