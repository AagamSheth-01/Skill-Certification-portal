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

    // Logo path (place logo file in /assets or /public)
    const logoPath = path.join(process.cwd(), "assets", "upskill_logo.png");

    // Create PDF
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // 🎨 Background and Border
    doc.rect(0, 0, doc.page.width, doc.page.height).fill("#faf3e0");

    // Gold border
    const borderColor = "#c7a008";
    doc
      .lineWidth(10)
      .strokeColor(borderColor)
      .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
      .stroke();

    // ✅ Add UpSkill logo at top
    if (fs.existsSync(logoPath)) {
      const logoWidth = 140;
      const centerX = (doc.page.width - logoWidth) / 2;
      doc.image(logoPath, centerX, 40, { width: logoWidth });
    }

    // ✅ Optional watermark (faint logo in center)
    if (fs.existsSync(logoPath)) {
      const wmWidth = 300;
      const wmX = (doc.page.width - wmWidth) / 2;
      const wmY = doc.page.height / 2 - 100;
      doc.opacity(0.08).image(logoPath, wmX, wmY, { width: wmWidth }).opacity(1);
    }

    doc.moveDown(5);

    // 🏅 Title
    doc
      .font("Times-Bold")
      .fontSize(36)
      .fillColor("#b48c02")
      .text("Certificate of Completion", { align: "center" });

    doc.moveDown(1.5);

    // Subtitle
    doc
      .font("Times-Italic")
      .fontSize(20)
      .fillColor("#333")
      .text("This is proudly presented to", { align: "center" });

    doc.moveDown(1);

    // Recipient Name
    doc
      .font("Helvetica-Bold")
      .fontSize(32)
      .fillColor("#000000")
      .text(user.fullName, { align: "center", underline: true });

    doc.moveDown(1);

    // Achievement text
    doc
      .font("Times-Roman")
      .fontSize(20)
      .fillColor("#333")
      .text("for successfully completing the course", { align: "center" });

    doc.moveDown(0.5);

    // Course Title
    doc
      .font("Helvetica-Bold")
      .fontSize(26)
      .fillColor("#1a5276")
      .text(course.title, { align: "center" });

    doc.moveDown(2);

    // Decorative separator
    doc
      .moveTo(100, doc.y)
      .lineTo(doc.page.width - 100, doc.y)
      .strokeColor("#b48c02")
      .lineWidth(2)
      .stroke();

    doc.moveDown(2);

    // Date & Signature
    const currentDate = new Date().toLocaleDateString();
    doc.font("Helvetica").fontSize(16).fillColor("#000");
    doc.text(`Date: ${currentDate}`, 70, doc.page.height - 150);
    doc.text("_________________________", doc.page.width - 270, doc.page.height - 160);
    doc.text("Authorized Signature", doc.page.width - 250, doc.page.height - 140);

    // Footer Branding
    doc
      .fontSize(12)
      .fillColor("#555")
      .text("UpSkill — Empowering Learning, Building Futures", 0, doc.page.height - 50, {
        align: "center",
      });

    doc.end();

    // Save after stream finishes
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