import Joi from "joi";

// ===== Add to Wishlist =====
// bookId: MongoDB ObjectId — required
export const addToWishlistSchema = Joi.object({
  bookId: Joi.string()
    .pattern(/^[a-fA-F0-9]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "bookId must be a valid MongoDB ObjectId",
      "any.required": "bookId is required",
    }),
});