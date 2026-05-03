import { ErrorHandler, SendError } from "../../services/errorhandeler.js";
import { BookModel } from "../models/book_model.js";
import { ratingAndReviewModel } from "../models/ratingandreviewes_model.js";

export const updateBookRating = async (bookId) => {
  const allReviews = await ratingAndReviewModel.find({ bookId });

  if (allReviews.length > 0) {
    const totalStars = allReviews.reduce((sum, item) => sum + item.rating, 0);
    const averageRating = (totalStars / allReviews.length).toFixed(1);

    await BookModel.findByIdAndUpdate(bookId, {
      retingAvg: averageRating,
      numberOfReviews: allReviews.length,
    });
  } else {
    await BookModel.findByIdAndUpdate(bookId, {
      retingAvg: 0,
      numberOfReviews: 0,
    });
  }
};

export const reviewMiddelware = ErrorHandler(async (req, res, next) => {
  const { id } = req.params; 
  const userId = req.user.id; 
  const review = await ratingAndReviewModel.findById(id);

  if (!review) throw new SendError(404, "Review not found")

  if (review.userId.toString() !== userId) throw new SendError(403, "You are not authorized to perform this action")
  
  // 4. "التريك" المهم: بنخزن التقييم في الـ req عشان الدوال اللي بعده تشوفه
  req.review = review;
  next();
});