import express from "express";
import Contact from "../models/Contact.js";
import transporter from "../config/email.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Save to database
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Send email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New message from ${name} (Portfolio)`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9;">
          <h2 style="color: #333;">New Portfolio Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="margin-top: 15px;">
            <strong>Message:</strong>
            <div style="background: white; padding: 12px; border-radius: 6px; margin-top: 8px; color: #222;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;">
          <p style="font-size: 0.9em; color: #777;">Sent via your portfolio contact form.</p>
        </div>
      `,
    });

    res
      .status(201)
      .json({ success: true, message: "Your message has been sent!" });
  } catch (error) {
    console.error("Contact API Error:", error);
    res
      .status(500)
      .json({ error: "Failed to send message. Please try again." });
  }
});

export default router;
