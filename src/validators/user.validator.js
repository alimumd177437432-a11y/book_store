import Joi from "joi";

// ===== Signup =====
// name: حروف فقط (عربي أو إنجليزي أو مسافة) — 2 إلى 50 حرف
// email: صيغة إيميل صحيحة
// password: 8 أحرف على الأقل، حرف كبير واحد، رقم واحد على الأقل
// phone: أرقام وعلامة + فقط، 7 إلى 15 رقم
export const signupSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[\u0600-\u06FFa-zA-Z\s]+$/)
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.pattern.base": "Name should only contain letters",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name must be at most 50 characters",
      "any.required": "Name is required",
    }),

  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),

  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter and one number",
      "any.required": "Password is required",
    }),

  phone: Joi.string()
    .pattern(/^\+?[0-9]{7,15}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be between 7 and 15 digits and may start with +",
      "any.required": "Phone is required",
    }),
});

// ===== Login =====
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),

  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

// ===== Update Account =====

export const updateAccountSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[\u0600-\u06FFa-zA-Z\s]+$/)
    .min(2)
    .max(50)
    .messages({
      "string.pattern.base": "Name should only contain letters",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name must be at most 50 characters",
    }),

  email: Joi.string().email().messages({
    "string.email": "Please provide a valid email address",
  }),

  phone: Joi.string()
    .pattern(/^\+?[0-9]{7,15}$/)
    .messages({
      "string.pattern.base":
        "Phone number must be between 7 and 15 digits and may start with +",
    }),

  address: Joi.string().max(200).messages({
    "string.max": "Address must be at most 200 characters",
  }),
})
  .min(1)
  .messages({
    "object.min": "Please provide at least one field to update",
  });

// ===== Update Password =====
export const updatePasswordSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter and one number",
      "any.required": "Password is required",
    }),
});

// ===== Ask Reset Password =====
export const askResetPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
});

// ===== New Password (reset) =====
export const newPasswordSchema = Joi.object({
  otp: Joi.string().length(6).pattern(/^\d+$/).required().messages({
    "string.length": "OTP must be exactly 6 digits",
    "string.pattern.base": "OTP must contain digits only",
    "any.required": "OTP is required",
  }),

  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter and one number",
      "any.required": "Password is required",
    }),
});