import Joi from "joi";

// ===== Add to Cart =====
// bookId: MongoDB ObjectId — 24 حرف hex
// count: رقم صحيح موجب
export const addToCartSchema = Joi.object({
  bookId: Joi.string()
    .pattern(/^[a-fA-F0-9]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "bookId must be a valid MongoDB ObjectId",
      "any.required": "bookId is required",
    }),

  count: Joi.number().integer().min(1).required().messages({
    "number.base": "Count must be a number",
    "number.integer": "Count must be a whole number",
    "number.min": "Count must be at least 1",
    "any.required": "Count is required",
  }),
});

// ===== Update Cart Item (count فقط) =====
export const updateCartSchema = Joi.object({
  count: Joi.number().integer().min(1).required().messages({
    "number.base": "Count must be a number",
    "number.integer": "Count must be a whole number",
    "number.min": "Count must be at least 1",
    "any.required": "Count is required",
  }),
});