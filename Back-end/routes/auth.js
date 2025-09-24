import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import User from "../model/User.js";

const router = express.Router();

// Configure multer for profile pic uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder to store images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Temporary OTP storage
const emailOtpStore = {};
const phoneOtpStore = {};

// =======================
// REGISTER USER
// =======================
router.post("/register", upload.single("profilePic"), async (req, res) => {
  try {
    const { fullName, username, email, phone, password } = req.body;

    // Check for uniqueness
    if (await User.findOne({ email })) return res.status(400).json({ message: "Email already exists" });
    if (await User.findOne({ username })) return res.status(400).json({ message: "Username already exists" });
    if (await User.findOne({ phone })) return res.status(400).json({ message: "Phone already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle profile pic
    const profilePic = req.file ? req.file.path : undefined;

    // Create user
    const user = new User({ fullName, username, email, phone, password: hashedPassword, profilePic });
    await user.save();

    // Generate OTPs
    const emailOtp = Math.floor(100000 + Math.random() * 900000);
    const phoneOtp = Math.floor(100000 + Math.random() * 900000);
    emailOtpStore[email] = emailOtp;
    phoneOtpStore[phone] = phoneOtp;

    console.log(`Email OTP for ${email}: ${emailOtp}`);
    console.log(`Phone OTP for ${phone}: ${phoneOtp}`);

    res.status(201).json({ message: "User registered. Verify email & phone to activate account." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// =======================
// VERIFY EMAIL OTP
// =======================
router.post("/verify-email", async (req, res) => {
  const { email, otp } = req.body;
  if (emailOtpStore[email] && emailOtpStore[email] == otp) {
    await User.findOneAndUpdate({ email }, { emailVerified: true });
    delete emailOtpStore[email];
    return res.json({ message: "Email verified successfully" });
  }
  res.status(400).json({ message: "Invalid OTP" });
});

// =======================
// VERIFY PHONE OTP
// =======================
router.post("/verify-phone", async (req, res) => {
  const { phone, otp } = req.body;
  if (phoneOtpStore[phone] && phoneOtpStore[phone] == otp) {
    await User.findOneAndUpdate({ phone }, { phoneVerified: true });
    delete phoneOtpStore[phone];
    return res.json({ message: "Phone verified successfully" });
  }
  res.status(400).json({ message: "Invalid OTP" });
});

// =======================
// LOGIN
// =======================
router.post("/login", async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
    });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.emailVerified) return res.status(403).json({ message: "Email not verified" });
    if (!user.phoneVerified) return res.status(403).json({ message: "Phone not verified" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        phone: user.phone,
        profilePic: user.profilePic
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// =======================
// GET CURRENT USER
// =======================
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
