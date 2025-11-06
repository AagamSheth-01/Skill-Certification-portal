import express from "express";
import { createTest, getTestByCourse, submitTest } from "../controller/TestController.js";

const router = express.Router();

// Admin: create test
router.post("/", createTest);

// Student: get test
router.get("/:courseId", getTestByCourse);

// Student: submit test
router.post("/submit", submitTest);

export default router;
