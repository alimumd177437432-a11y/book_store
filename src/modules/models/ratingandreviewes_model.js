import { request } from "express";
import mongoose from "mongoose";

const ratingAndReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must be at most 5"],
    },
    review: {
      type: String,
      trim: true,
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
ratingAndReviewSchema.index({ userId: 1, bookId: 1 }, { unique: true });


export const ratingAndReviewModel = mongoose.model("ratingAndReview", ratingAndReviewSchema);
