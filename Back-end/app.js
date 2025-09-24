import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;


// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`🚀 Server Gate open at http://localhost:${PORT}`);
});
