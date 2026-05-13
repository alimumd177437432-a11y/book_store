import Joi from "joi";

// ===== Add Book =====
// title, description, type, price — كلها required
// الصور بتيجي عبر multer (req.files) مش req.body — ما بنـvalidate فيها هون
export const addBookSchema = Joi.object({
  title: Joi.string().min(2).max(200).required().messages({
    "string.min": "Title must be at least 2 characters",
    "string.max": "Title must be at most 200 characters",
    "any.required": "Title is required",
  }),

  description: Joi.string().min(10).max(2000).required().messages({
    "string.min": "Description must be at least 10 characters",
    "string.max": "Description must be at most 2000 characters",
    "any.required": "Description is required",
  }),

  type: Joi.string().valid("printed", "digital").required().messages({
    "any.only": 'Type must be either "printed" or "digital"',
    "any.required": "Type is required",
  }),

  price: Joi.number().positive().precision(2).required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be a positive number",
    "any.required": "Price is required",
  }),
});

// ===== Update Book =====
// كل الحقول اختيارية — بس لازم يبعت واحد على الأقل
export const updateBookSchema = Joi.object({
  title: Joi.string().min(2).max(200).messages({
    "string.min": "Title must be at least 2 characters",
    "string.max": "Title must be at most 200 characters",
  }),

  description: Joi.string().min(10).max(2000).messages({
    "string.min": "Description must be at least 10 characters",
    "string.max": "Description must be at most 2000 characters",
  }),

  type: Joi.string().valid("printed", "digital").messages({
    "any.only": 'Type must be either "printed" or "digital"',
  }),

  price: Joi.number().positive().precision(2).messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be a positive number",
  }),
})
  .min(1)
  .messages({
    "object.min": "Please provide at least one field to update",
  });