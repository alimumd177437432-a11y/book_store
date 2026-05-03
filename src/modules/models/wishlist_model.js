import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
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
wishlistSchema.index({ userId: 1, bookId: 1 }, { unique: true });

export const wishlistModel = mongoose.model("wishlist", wishlistSchema);
