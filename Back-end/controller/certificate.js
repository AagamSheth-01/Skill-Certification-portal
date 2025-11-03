import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import Certificate from "../model/Certificates.js";
import Course from "../model/Course.js";
import User from "../model/User.js";

export const createCertificate = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: "User or course not found" });
    }

    // Ensure certificates folder exists
    const certificatesDir = path.join(process.cwd(), "certificates");
    if (!fs.existsSync(certificatesDir)) fs.mkdirSync(certificatesDir);

    const fileName = `certificate_${userId}_${courseId}.pdf`;
    const filePath = path.join(certificatesDir, fileName);

    // Create PDF
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 60, bottom: 50, left: 60, right: 60 },
    });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // 🎨 Background & Border
    doc.rect(20, 20, 555, 800).stroke("#C5A654");
    doc.rect(30, 30, 535, 780).stroke("#C5A654");
    doc.fillColor("#FAF9F6");

    // 🏷️ Add Logo
    const logoPath = path.join(process.cwd(), "assets", "upskill_logo.png");
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, doc.page.width / 2 - 50, 50, { width: 100 });
    }

    // 🏆 Title
    doc.moveDown(5);
    doc
      .font("Helvetica-Bold")
      .fontSize(30)
      .fillColor("#C5A654")
      .text("Certificate of Completion", { align: "center" });

    // ✍️ Subtitle
    doc.moveDown(1);
    doc
      .font("Helvetica")
      .fontSize(18)
      .fillColor("#333333")
      .text("This is proudly presented to", { align: "center" });

    // 👤 Recipient Name
    doc.moveDown(1);
    doc
      .font("Helvetica-Bold")
      .fontSize(26)
      .fillColor("#0A2E57")
      .text(user.fullName, { align: "center" });

    // 📘 Course
    doc.moveDown(1);
    doc
      .font("Helvetica")
      .fontSize(18)
      .fillColor("#333333")
      .text("for successfully completing the course", { align: "center" });

    doc.moveDown(0.5);
    doc
      .font("Helvetica-Bold")
      .fontSize(22)
      .fillColor("#0A2E57")
      .text(course.title, { align: "center" });

    // 📅 Date & Signature Line
    const date = new Date().toLocaleDateString();
    doc.moveDown(5);
    doc
      .font("Helvetica")
      .fontSize(14)
      .fillColor("#000")
      .text(`Date: ${date}`, 100, 620);

    doc
      .moveTo(380, 620)
      .lineTo(500, 620)
      .stroke("#444");
    doc.text("Authorized Signature", 385, 630);

    // 🪶 Footer
    doc.moveDown(3);
    doc
      .fontSize(12)
      .fillColor("#666")
      .text("UpSkill — Empowering Learning, Building Futures", {
        align: "center",
      });

    // ✅ Finalize PDF
    doc.end();

    stream.on("finish", async () => {
      const certificate = new Certificate({
        user: userId,
        course: courseId,
        certificateUrl: `/certificates/${fileName}`,
      });
      await certificate.save();

      res.status(201).json({
        message: "Certificate generated successfully!",
        certificateUrl: certificate.certificateUrl,
      });
    });

    stream.on("error", (err) => {
      console.error("Error generating certificate PDF:", err);
      res.status(500).json({ message: "Failed to generate certificate" });
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getUserCertificates = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch all certificates for this user and populate course title
    const certificates = await Certificate.find({ user: userId })
      .populate("course", "title") // only get course title
      .sort({ dateIssued: -1 }); // latest first

    res.status(200).json(certificates);
  } catch (err) {
    console.error("Error fetching certificates:", err);
    res.status(500).json({ message: "Server error" });
  }
};