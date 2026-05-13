/**
 * validate.js
 * Middleware عام بيشغّل Joi schema على req.body
 * بيرجع كل الأخطاء دفعة واحدة بدل ما يوقف عند أول خطأ
 */

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (!error) return next();

  const errors = error.details.map((e) => e.message);
  return res.status(400).json({
    status: "fail",
    message: "Validation error",
    errors,
  });
};