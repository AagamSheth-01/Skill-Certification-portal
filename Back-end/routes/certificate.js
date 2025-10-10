import express from "express";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import authMiddleware from "../middleware/authentication";

const router = express.Router();

// POST /api/certificate/:courseId
router.post("/:courseId", authMiddleware, async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id;

  // Ensure certificates folder exists
  const certificatesDir = path.join(process.cwd(), "certificates");
  if (!fs.existsSync(certificatesDir)) fs.mkdirSync(certificatesDir);

  const fileName = `certificate_${userId}_${courseId}.pdf`;
  const filePath = path.join(certificatesDir, fileName);

  // Generate PDF
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  // Certificate content
  doc.fontSize(30).text("🎓 Certificate of Completion", { align: "center" });
  doc.moveDown(2);
  doc.fontSize(22).text(`This certifies that`, { align: "center" });
  doc.moveDown(1);
  doc.fontSize(26).text(`User ${userId}`, { align: "center", underline: true });
  doc.moveDown(1);
  doc.fontSize(22).text(`has successfully completed the course`, { align: "center" });
  doc.moveDown(1);
  doc.fontSize(24).text(`${courseId}`, { align: "center", bold: true });
  doc.moveDown(3);
  doc.fontSize(16).text(`Date: ${new Date().toLocaleDateString()}`, { align: "center" });

  doc.end();

  // Wait for PDF to finish
  stream.on("finish", () => {
    res.json({ certificateUrl: `http://localhost:5000/certificates/${fileName}` });
  });

  stream.on("error", (err) => {
    console.error("Error generating certificate PDF:", err);
    res.status(500).json({ message: "Failed to generate certificate" });
  });
});

export default router;
