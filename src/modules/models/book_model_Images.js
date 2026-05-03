import { request } from "express";
import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    path: [{
      type: String,
      required: true,
    }],
    bookId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ImageModel = mongoose.model("images", ImageSchema);
