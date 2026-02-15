import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";

// Connect to DB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS: local + deployed (allow all origins for portfolio API)
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/contact", contactRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Portfolio Backend running on http://localhost:${PORT}`);
});
