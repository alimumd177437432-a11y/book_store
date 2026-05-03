import { ErrorHandler, SendError } from "../../services/errorhandeler.js";
import { updateBookRating } from "../middelwares/ratingandreview_middelware.js";
import { BookModel } from "../models/book_model.js";
import { orderModel } from "../models/order_model.js";
import { ratingAndReviewModel } from "../models/ratingandreviewes_model.js";

export const addReview = ErrorHandler(async (req, res) => {
  const { rating, review, bookId } = req.body;
  const userId = req.user.id;
  const alreadyReviewed = await ratingAndReviewModel.findOne({
    userId,
    bookId,
  });

  if (alreadyReviewed) throw new SendError(400,"You have already reviewed this book. You can update your existing review instead.",);
  const hasPurchased = await orderModel.findOne({
    userId: userId,
    "orderItems.bookId": bookId,
    status: "delivered",
  });
  if (!hasPurchased)throw new SendError(403,"You must have a delivered order for this book to leave a review",);

  const newReview = await ratingAndReviewModel.create({
    rating,
    review,
    bookId,
    userId,
  });

  if (!newReview) throw new SendError(400, "Failed to add review");

  await updateBookRating(bookId);
  res.status(201).json({
    message: "Review added and book rating updated successfully",
    data: newReview,
  });
});

export const getAllReviewsForBook = ErrorHandler(async (req, res, next) => {
  const { bookId } = req.params;
  const isBookExist = await BookModel.findById(bookId);
  if (!isBookExist) throw new SendError(404, "Book not found");

  const reviews = await ratingAndReviewModel
    .find({ bookId })
    .populate("userId", "name")
    .sort("-createdAt");

  res.status(200).json({
    message: "Reviews fetched successfully",
    results: reviews.length,
    data: reviews,
  });
});

export const deleteReview = ErrorHandler(async (req, res) => {
  await ratingAndReviewModel.findByIdAndDelete(req.params.id);

  await updateBookRating(req.review.bookId);

  res.status(200).json({ message: "Review deleted successfully" });
});

export const updateReview = ErrorHandler(async (req, res) => {
  const updatedReview = await ratingAndReviewModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: "after" },
  );

  await updateBookRating(updatedReview.bookId);

  res
    .status(200)
    .json({ message: "Review updated successfully", data: updatedReview });
});
