import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";

// Connect to DB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS: सही origins (local + future domain)
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500", // VS Code Live Server (default)
      "http://localhost:5500", // Alternate Live Server
      "http://127.0.0.1:5173", // Vite (अगर आप बाद में React/Vite इस्तेमाल करें)
      "http://localhost:5173",
      "https://yourdomain.com", // ✅ No trailing spaces!
    ],
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
