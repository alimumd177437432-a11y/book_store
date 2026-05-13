import Joi from "joi";

// تعريف قاعدة الـ ObjectId عشان نكررها بسهولة
const objectIdRule = Joi.string().pattern(/^[a-fA-F0-9]{24}$/);

// ===== Add to Cart (إضافة للسلة) =====
export const addToCartSchema = Joi.object({
  // مسموح يوصل من التوكن وما رح يعطي Error 400 هالحين
  userId: objectIdRule, 

  bookId: objectIdRule.required().messages({
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

// ===== Update Cart Item (تعديل الكمية فقط) =====
export const updateCartSchema = Joi.object({
  // مسموح يوصل من التوكن
  userId: objectIdRule,

  count: Joi.number().integer().min(1).required().messages({
    "number.base": "Count must be a number",
    "number.integer": "Count must be a whole number",
    "number.min": "Count must be at least 1",
    "any.required": "Count is required",
  }),
});

// ===== Cart Params (لفحص الـ ID في الرابط لو لزم الأمر) =====
export const cartParamsSchema = Joi.object({
  id: objectIdRule.required().messages({
    "string.pattern.base": "Invalid Cart ID format",
  }),
});