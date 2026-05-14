import Joi from "joi";

const objectIdRule = Joi.string().pattern(/^[a-fA-F0-9]{24}$/);

// ===== Create Order =====
export const createOrderSchema = Joi.object({
  // بييجي من passUserId — نسمح فيه لكن ما بنطلبه من المستخدم
  userId: objectIdRule.messages({
    "string.pattern.base": "userId must be a valid MongoDB ObjectId",
  }),

  address: Joi.object({
    governorate: Joi.string().min(2).max(100).messages({
      "string.min": "Governorate must be at least 2 characters",
      "string.max": "Governorate must be at most 100 characters",
    }),
    street: Joi.string().min(2).max(200).messages({
      "string.min": "Street must be at least 2 characters",
      "string.max": "Street must be at most 200 characters",
    }),
    description: Joi.string().max(500).messages({
      "string.max": "Description must be at most 500 characters",
    }),
    phone: Joi.string().pattern(/^\+?[0-9]{7,15}$/).messages({
      "string.pattern.base": "Phone number must be between 7 and 15 digits and may start with +",
    }),
  }).messages({
    "object.base": "Address must be an object",
  }),

  paymentMethods: Joi.string().valid("cash", "online").messages({
    "any.only": 'Payment method must be either "cash" or "online"',
  }),
});

// ===== Update Order Status (admin) =====
export const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "confirmed", "shipped", "delivered", "cancelled")
    .required()
    .messages({
      "any.only": 'Status must be one of: "pending", "confirmed", "shipped", "delivered", "cancelled"',
      "any.required": "Status is required",
    }),
});