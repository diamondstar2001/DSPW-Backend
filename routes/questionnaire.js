const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
require("dotenv").config();

router.post("/", async (req, res) => {
    const { name, company, email, service, message } = req.body;

    // Validation
    if (!name || !email || !service) {
        return res.status(400).json({ error: "Name, Email and Service are required" });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, // true for port 465, false for other ports like 587
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: `"Al Bony Press" <${process.env.SMTP_USER}>`,
            to: process.env.TO_EMAIL,
            subject: `New Questionnaire Submission: ${service}`,
            html: `
                <h3>New Questionnaire Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Company:</strong> ${company || "N/A"}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Service Required:</strong> ${service}</p>
                <p><strong>Message:</strong></p>
                <p>${message || "N/A"}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Questionnaire submitted successfully" });

    } catch (error) {
        console.error("Error sending questionnaire email:", error?.response || error?.message || error);
        res.status(500).json({
            error: "Email could not be sent",
            details: error?.message || "Unknown error",
        });
    }
});

module.exports = router;
