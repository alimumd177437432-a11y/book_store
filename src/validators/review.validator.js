import Joi from "joi";

// ===== Add Review =====
// rating: رقم من 1 إلى 5
// review: اختياري — نص
// bookId: MongoDB ObjectId — required
export const addReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required().messages({
    "number.base": "Rating must be a number",
    "number.integer": "Rating must be a whole number",
    "number.min": "Rating must be at least 1",
    "number.max": "Rating must be at most 5",
    "any.required": "Rating is required",
  }),

  review: Joi.string().min(3).max(1000).messages({
    "string.min": "Review must be at least 3 characters",
    "string.max": "Review must be at most 1000 characters",
  }),

  bookId: Joi.string()
    .pattern(/^[a-fA-F0-9]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "bookId must be a valid MongoDB ObjectId",
      "any.required": "bookId is required",
    }),
});

// ===== Update Review =====
// كل الحقول اختيارية — بس لازم يبعت واحد على الأقل
export const updateReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).messages({
    "number.base": "Rating must be a number",
    "number.integer": "Rating must be a whole number",
    "number.min": "Rating must be at least 1",
    "number.max": "Rating must be at most 5",
  }),

  review: Joi.string().min(3).max(1000).messages({
    "string.min": "Review must be at least 3 characters",
    "string.max": "Review must be at most 1000 characters",
  }),
})
  .min(1)
  .messages({
    "object.min": "Please provide at least one field to update",
  });