import express from "express";
import authMiddleware from "../middleware/authentication.js";
import { createCertificate, getUserCertificates } from "../controller/certificate.js"; // ← fixed import

const router = express.Router();

// POST /api/certificate/:courseId
router.post("/:courseId", authMiddleware, createCertificate);

// GET /api/certificate/ - fetch all certificates for user
router.get("/", authMiddleware, getUserCertificates);

export default router;
