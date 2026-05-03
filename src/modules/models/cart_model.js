import { request } from "express";
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    count: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const cartModel = mongoose.model("cart", cartSchema);
