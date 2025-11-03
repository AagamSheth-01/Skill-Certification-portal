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

    // ✅ Path to your logo (ensure image exists here)
    const logoPath = path.join(process.cwd(), "assets", "upSkillLogo.png");

    // Create PDF
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // 🎨 Background
    doc.rect(0, 0, doc.page.width, doc.page.height).fill("#faf3e0");

    // 🟡 Border
    const borderColor = "#c7a008";
    doc
      .lineWidth(10)
      .strokeColor(borderColor)
      .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
      .stroke();

    // ✅ Insert logo after fill reset
    if (fs.existsSync(logoPath)) {
      const logoWidth = 120;
      const logoX = (doc.page.width - logoWidth) / 2;
      const logoY = 55;
      doc.image(logoPath, logoX, logoY, { width: logoWidth });
    }

    // ✅ Watermark (faint)
    if (fs.existsSync(logoPath)) {
      const wmWidth = 280;
      const wmX = (doc.page.width - wmWidth) / 2;
      const wmY = 290;
      doc.opacity(0.08).image(logoPath, wmX, wmY, { width: wmWidth }).opacity(1);
    }

    // Content starts lower to avoid pushing footer
    let yStart = 200;

    // 🏅 Title
    doc
      .font("Times-Bold")
      .fontSize(36)
      .fillColor("#b48c02")
      .text("Certificate of Completion", 50, yStart, { align: "center" });

    yStart += 70;

    doc
      .font("Times-Italic")
      .fontSize(20)
      .fillColor("#333")
      .text("This is proudly presented to", 50, yStart, { align: "center" });

    yStart += 40;

    doc
      .font("Helvetica-Bold")
      .fontSize(30)
      .fillColor("#000")
      .text(user.fullName, 50, yStart, { align: "center", underline: true });

    yStart += 50;

    doc
      .font("Times-Roman")
      .fontSize(20)
      .fillColor("#333")
      .text("for successfully completing the course", 50, yStart, {
        align: "center",
      });

    yStart += 40;

    doc
      .font("Helvetica-Bold")
      .fontSize(26)
      .fillColor("#1a5276")
      .text(course.title, 50, yStart, { align: "center" });

    yStart += 70;

    // Decorative line
    doc
      .moveTo(100, yStart)
      .lineTo(doc.page.width - 100, yStart)
      .strokeColor("#b48c02")
      .lineWidth(2)
      .stroke();

    yStart += 80;

    const currentDate = new Date().toLocaleDateString();

    doc.font("Helvetica").fontSize(16).fillColor("#000");
    doc.text(`Date: ${currentDate}`, 80, yStart + 20);
    doc.text("_________________________", doc.page.width - 270, yStart + 10);
    doc.text("Authorized Signature", doc.page.width - 250, yStart + 30);

    // ✅ Footer — adjusted upward and constrained width to prevent overflow
    const footerText = "UpSkill — Empowering Learning, Building Futures";
    doc
      .fontSize(12)
      .fillColor("#555")
      .text(footerText, 50, doc.page.height - 70, {
        align: "center",
        width: doc.page.width - 100, // keep within safe bounds
      });

    doc.end();

    stream.on("finish", async () => {
      const certificate = new Certificate({
        user: userId,
        course: courseId,
        certificateUrl: `/certificates/${fileName}`,
      });
      await certificate.save();
      console.log("✅ Certificate saved at:", filePath);

      res.status(201).json({
        message: "Certificate issued successfully",
        certificateUrl: certificate.certificateUrl,
      });
    });

    stream.on("error", (err) => {
      console.error("Error generating certificate PDF:", err);
      res.status(500).json({ message: "Failed to generate certificate" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserCertificates = async (req, res) => {
  try {
    const userId = req.user.id;

    const certificates = await Certificate.find({ user: userId })
      .populate("course", "title")
      .sort({ dateIssued: -1 });

    res.status(200).json(certificates);
  } catch (err) {
    console.error("Error fetching certificates:", err);
    res.status(500).json({ message: "Server error" });
  }
};
