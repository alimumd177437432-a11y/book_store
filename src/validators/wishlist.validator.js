import Joi from "joi";

const objectIdRule = Joi.string().pattern(/^[a-fA-F0-9]{24}$/);

// ===== Add to Wishlist =====
export const addToWishlistSchema = Joi.object({
  bookId: objectIdRule.required().messages({
    "string.pattern.base": "bookId must be a valid MongoDB ObjectId",
    "any.required": "bookId is required",
  }),
}).options({ allowUnknown: false });