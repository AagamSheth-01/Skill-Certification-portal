import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/coureses.js";
import progressRoutes from "./routes/progress.js";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/certificates", express.static(path.join(__dirname, "certificates")));


// Routes
app.use("/api/auth", authRoutes);

// Sample courses data


// Courses endpoints

app.use("/api/courses", courseRoutes);
app.use("/api/progress", progressRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});


