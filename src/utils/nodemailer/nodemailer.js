import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { verificationTemplate } from "./emailTemplete.js";
import { generateOtp } from "../otp/otp.js";
import { resetPasswprdTemplete } from "./resetpasswordTemplete.js";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.SMTP_HOST,
 port: process.env.SMTP_PORT,
  secure: true, 
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS, // اتأكد إنه الكود الـ 16 حرف الجديد
  },
});

export const sendEmail = async (email) => {
  const emailToken = jwt.sign({ email }, process.env.SECRET_KEY);
  await transporter.sendMail({
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: "book_store",
    text: "hi wellcome you in our book store",
    html: verificationTemplate(emailToken),
  });
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
