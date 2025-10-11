import mongoose from "mongoose";
import dotenv from "dotenv";
import seed from "./seed1.js"; // adjust path if needed

dotenv.config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    await seed(); // call your function

    await mongoose.disconnect();
    console.log("✅ Seeding completed, disconnected");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  }
}

run();
