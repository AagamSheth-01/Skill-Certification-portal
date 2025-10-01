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
  const { lessonIndex } = req.body;

  let progress = await Progress.findOne({
    userId: req.user.id,
    courseId: req.params.courseId,
  });

  if (!progress) {
    progress = new Progress({
      userId: req.user.id,
      courseId: req.params.courseId,
      completedLessons: [lessonIndex],
    });
  } else {
    if (!progress.completedLessons.includes(lessonIndex)) {
      progress.completedLessons.push(lessonIndex);
    }
  }

  await progress.save();
  res.json(progress);
});

export default router;
