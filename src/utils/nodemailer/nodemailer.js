import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { verificationTemplate } from "./emailTemplete.js";
import { generateOtp } from "../otp/otp.js";
import { resetPasswprdTemplete } from "./resetpasswordTemplete.js";
dotenv.config();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // لازم false للمنفذ 587
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
  // --- أضف هذا الجزء ضروري جداً للسيرفرات ---
  tls: {
    rejectUnauthorized: false 
  }
});

export const sendEmail = async (email) => {
  try {
    const emailToken = jwt.sign({ email }, process.env.SECRET_KEY);
    const info = await transporter.sendMail({
      from: `"Book Store" <${process.env.NODEMAILER_USER}>`, // كتابة الاسم بشكل أوضح
      to: email,
      subject: "Verify your email - Book Store",
      text: "Welcome to our store, please verify your email.",
      html: verificationTemplate(emailToken),
    });

    console.log("✅ Email sent successfully to:", email);
    return info;
  } catch (error) {
    // هذا السطر هو اللي هيظهر لك في شاشة Logs الـ Render
    console.error("❌ NODE_MAILER_ERROR:", error); 
    throw error; 
  }
};
export const resetPasswordEmail = async (email) => {
  const otp = generateOtp();
  const otpToken = jwt.sign({ otp, email }, process.env.SECRET_KEY);
  await transporter.sendMail({
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: "book-reset-password",
    text: "book",
    html: resetPasswprdTemplete(otp, otpToken),
  });
};
