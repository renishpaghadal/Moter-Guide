require("dotenv").config();
const nodemailer = require("nodemailer");

const sendMail = async (to, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Environment variable for email
        pass: process.env.EMAIL_PASS, // Environment variable for password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to, 
      subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error(" Error sending email:", error);
    throw new Error("Email sending failed.");
  }
};

module.exports = sendMail;
