import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";

const transporter = nodemailer.createTransport({
  service: "gmail",
   port: 587,  
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS, // app password (not normal password)
  },
});

export async function sendEmail(to, subject, text) {
  try {
    await transporter.sendMail({
      from: `"MyApp" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log("Email sent to:", to);
  } catch (err) {
    console.error("Error sending email:", err.message);
  }
}
