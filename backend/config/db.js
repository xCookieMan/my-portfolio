// config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// 🔎 DEBUG: URI चेक करें
console.log(
  "✅ Using MongoDB URI (first 50 chars):",
  process.env.MONGODB_URI?.substring(0, 50) + "..."
);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      appName: "portfolio",
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
