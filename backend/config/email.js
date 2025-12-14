import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// ✅ सुरक्षा: undefined check
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASSWORD?.replace(/\s+/g, "");

if (!emailUser || !emailPass) {
  console.warn("⚠️ EMAIL_USER or EMAIL_PASSWORD missing in .env");
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

// ✅ Optional: Connection test (uncomment to debug)
// transporter.verify((error, success) => {
//   if (error) {
//     console.error("📧 Email transport error:", error);
//   } else {
//     console.log("📧 Email transport ready");
//   }
// });

export default transporter;