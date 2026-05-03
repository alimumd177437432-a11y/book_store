import { request } from "express";
import mongoose from "mongoose";

const paySchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    status: {
      type: String,
      enum: ["pending", "succeeded", "failed"],
      default: "pending",
    },
    paymentGateway: { type: String, default: "stripe" },
    stripeSessionId: { type: String }, // لربطه بجلسة سترايب
  },
  {
    timestamps: true,
  },
);

export const payModel = mongoose.model("payment", paySchema);
