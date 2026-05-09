import { Resend } from "resend";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { verificationTemplate } from "./emailTemplete.js";
import { generateOtp } from "../otp/otp.js";
import { resetPasswprdTemplete } from "./resetpasswordTemplete.js";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

// 1. Send verification email during registration
export const sendEmail = async (email) => {
  try {
    const emailToken = jwt.sign({ email }, process.env.SECRET_KEY);
    
    const { data, error } = await resend.emails.send({
      from: "BookStore <onboarding@resend.dev>",
      to: email,
      subject: "Verify your email - Book Store",
      html: verificationTemplate(emailToken),
    });

    if (error) {
      console.error("Resend Error:", error);
      throw error;
    }

    console.log("Email sent via Resend API:", data.id);
    return data;
  } catch (err) {
    console.error("Email verification failure:", err.message);
    throw err;
  }
};

// 2. Send reset password email
export const resetPasswordEmail = async (email) => {
  try {
    const otp = generateOtp();
    const otpToken = jwt.sign({ otp, email }, process.env.SECRET_KEY, { expiresIn: '10m' });

    const { data, error } = await resend.emails.send({
      from: "BookStore <onboarding@resend.dev>",
      to: email,
      subject: "Reset your password - Book Store",
      html: resetPasswprdTemplete(otp, otpToken),
    });

    if (error) {
      console.error("Resend Reset Error:", error);
      throw error;
    }

    console.log("Reset password email sent:", data.id);
    return { data, otp };
  } catch (err) {
    console.error("Reset password failure:", err.message);
    throw err;
  }
};
