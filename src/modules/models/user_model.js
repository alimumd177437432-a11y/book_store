import { request } from "express";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verifed: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      country: { type: String },
      city:    { type: String },
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const userModel = mongoose.model("users", userSchema);