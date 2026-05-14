import Joi from "joi";

const objectIdRule = Joi.string().pattern(/^[a-fA-F0-9]{24}$/);

// ===== Add to Cart =====
// userId بيتضاف تلقائياً من passUserIdMiddelware على req.body قبل الـ validate
// لذلك لازم نسمح فيه — لكن المستخدم ما يقدر يبعته بنفسه لأنه بييجي من التوكن
export const addToCartSchema = Joi.object({
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

  // بيتضاف من passUserIdMiddelware — نسمح فيه لكن ما بنطلبه من المستخدم
  userId: objectIdRule.messages({
    "string.pattern.base": "userId must be a valid MongoDB ObjectId",
  }),
});

// ===== Update Cart Item =====
// الـ update بيشتغل على count فقط — userId مش موجود في req.body هون
export const updateCartSchema = Joi.object({
  count: Joi.number().integer().min(1).required().messages({
    "number.base": "Count must be a number",
    "number.integer": "Count must be a whole number",
    "number.min": "Count must be at least 1",
    "any.required": "Count is required",
  }),
});