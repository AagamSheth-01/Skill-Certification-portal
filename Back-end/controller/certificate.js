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

    // Generate PDF
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // PDF content
    doc.fontSize(30).text("🎓 Certificate of Completion", { align: "center" });
    doc.moveDown(2);
    doc.fontSize(22).text("This certifies that", { align: "center" });
    doc.moveDown(1);
    doc.fontSize(26).text(user.fullName, { align: "center", underline: true }); // <-- fixed
    doc.moveDown(1);
    doc.fontSize(22).text("has successfully completed the course", { align: "center" });
    doc.moveDown(1);
    doc.fontSize(24).text(course.title, { align: "center", bold: true });
    doc.moveDown(3);
    doc.fontSize(16).text(`Date: ${new Date().toLocaleDateString()}`, { align: "center" }); // <-- fixed template string

    doc.end();

    stream.on("finish", async () => {
      const certificate = new Certificate({
        user: userId,
        course: courseId,
        certificateUrl: `/certificates/${fileName}`,
      });
      await certificate.save();
      console.log("Certificate saved at:", filePath);

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
