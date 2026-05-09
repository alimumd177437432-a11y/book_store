import nodemailer from "nodemailer";
import { Resend } from "resend";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { verificationTemplate } from "./emailTemplete.js";
import { generateOtp } from "../otp/otp.js";
import { resetPasswprdTemplete } from "./resetpasswordTemplete.js";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (email) => {
    try {
        const emailToken = jwt.sign({ email }, process.env.SECRET_KEY);
        
        const { data, error } = await resend.emails.send({
            from: 'BookStore <onboarding@resend.dev>', // في البداية استخدم هاد الإيميل للتجربة
            to: email,
            subject: 'Verify your email - Book Store',
            html: verificationTemplate(emailToken),
        });

        if (error) {
            console.error("❌ Resend Error:", error);
            throw error;
        }

        console.log("✅ Email sent via Resend API:", data.id);
        return data;
    } catch (err) {
        console.error("❌ الخلل من السيرفر في إرسال الـ API:", err.message);
        throw err;
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
