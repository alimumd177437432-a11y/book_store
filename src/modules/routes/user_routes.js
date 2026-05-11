import { Router } from "express";
import { execute } from "../../middelwares/execute_middelware.js";
import { addForResetPassword, getMyAcountData, login, newpassword, signup, updateAcount, updatePassword, verifyEmial } from "../controler/user_controler.js";
import { deleteMiddelware, getMiddelware, putMiddelware } from "../../middelwares/query_middelwares.js";
import { userModel } from "../models/user_model.js";
import { filterMiddleware } from "../../middelwares/featuears_middelware.js";
import { authentication, authoriziation } from "../../middelwares/auth_middelware.js";
import { cartRouter } from "./cart_routes.js";
import { orderRouter } from "./order_routes.js";
import { loginLimiter } from "../../middelwares/rateLimiter.js";

const userRouter = Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: إدارة المستخدمين والمصادقة
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "664f1b2c9e1a2b3c4d5e6f7a"
 *         name:
 *           type: string
 *           example: "Ahmad Ali"
 *         email:
 *           type: string
 *           example: "ahmad@example.com"
 *         phone:
 *           type: string
 *           example: "0591234567"
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           example: "user"
 *         verifed:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: تسجيل مستخدم جديد
 *     tags: [Users]
 *     description: بعد التسجيل بيتبعت إيميل تحقق للمستخدم
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ahmad Ali"
 *               email:
 *                 type: string
 *                 example: "ahmad@example.com"
 *               password:
 *                 type: string
 *                 example: "Pass@1234"
 *               phone:
 *                 type: string
 *                 example: "0591234567"
 *     responses:
 *       201:
 *         description: تم التسجيل بنجاح، تحقق من إيميلك
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: "Created successfully , verify your email now"
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: خطأ في البيانات
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter.post("/signup", loginLimiter, signup);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: تسجيل الدخول
 *     tags: [Users]
 *     description: بترجع token — انسخه واضغط Authorize 🔒 في الأعلى والصقه
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "ahmad@example.com"
 *               password:
 *                 type: string
 *                 example: "Pass@1234"
 *     responses:
 *       200:
 *         description: تم الدخول بنجاح
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: إيميل أو باسورد غلط
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter.post("/login" , loginLimiter, login);

/**
 * @swagger
 * /user/verify/{token}:
 *   get:
 *     summary: تحقق من الإيميل
 *     tags: [Users]
 *     description: الرابط بيتبعت تلقائياً على الإيميل بعد التسجيل
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: التوكن الموجود في رابط الإيميل
 *     responses:
 *       200:
 *         description: تم التحقق بنجاح
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "verfied successfuly"
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: المستخدم غير موجود
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter.get("/verify/:token", verifyEmial);

/**
 * @swagger
 * /user:
 *   put:
 *     summary: تحديث بيانات الحساب
 *     tags: [Users]
 *     security:
 *       - tokenAuth: []
 *     description: لو غيّرت الإيميل بيتبعت إيميل تحقق جديد
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ahmad Mohammad"
 *               email:
 *                 type: string
 *                 example: "new@example.com"
 *               phone:
 *                 type: string
 *                 example: "0599999999"
 *     responses:
 *       200:
 *         description: تم التحديث بنجاح
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: خطأ في التحديث
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: مش مسجل دخول
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter.put("/", authentication, updateAcount);

/**
 * @swagger
 * /user/pass:
 *   put:
 *     summary: تغيير كلمة المرور
 *     tags: [Users]
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: "NewPass@5678"
 *     responses:
 *       200:
 *         description: تم تغيير الباسورد بنجاح
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: خطأ في التحديث
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: مش مسجل دخول
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter.put("/pass", authentication, updatePassword);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: جلب بيانات حسابي
 *     tags: [Users]
 *     security:
 *       - tokenAuth: []
 *     responses:
 *       200:
 *         description: بيانات المستخدم بدون الباسورد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: خطأ في جلب البيانات
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: مش مسجل دخول
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter.get("/", authentication, getMyAcountData);

/**
 * @swagger
 * /user/ask-reset-password:
 *   post:
 *     summary: طلب إعادة تعيين كلمة المرور
 *     tags: [Users]
 *     description: بيتبعت OTP على الإيميل مع رابط يحتوي على otpToken
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: "ahmad@example.com"
 *     responses:
 *       200:
 *         description: تم إرسال الإيميل بنجاح
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "success , cheak your mail"
 *       400:
 *         description: الإيميل غير موجود
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter.post("/ask-reset-password", loginLimiter,addForResetPassword);

/**
 * @swagger
 * /user/reset-password/{otpToken}:
 *   post:
 *     summary: تعيين كلمة مرور جديدة
 *     tags: [Users]
 *     description: |
 *       **خطوات إعادة التعيين:**
 *       1. اطلب OTP عبر `/user/ask-reset-password`
 *       2. افتح الإيميل واحصل على الـ OTP والـ otpToken من الرابط
 *       3. أرسل الـ OTP + الباسورد الجديد هنا
 *     parameters:
 *       - in: path
 *         name: otpToken
 *         required: true
 *         schema:
 *           type: string
 *         description: التوكن الموجود في رابط الإيميل
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - otp
 *               - password
 *             properties:
 *               otp:
 *                 type: string
 *                 example: "482931"
 *               password:
 *                 type: string
 *                 example: "NewPass@5678"
 *     responses:
 *       200:
 *         description: تم تغيير الباسورد بنجاح
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "password reset successfly"
 *       400:
 *         description: OTP غلط
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: المستخدم غير موجود
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter.post("/reset-password/:otpToken", loginLimiter,newpassword);
/**
 * @swagger
 * /user/{id}/cartItems:
 *   get:
 *     summary: جلب محتويات عربة التسوق لمستخدم معين
 *     tags: [Users, Cart]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف المستخدم (User ID)
 *     responses:
 *       200:
 *         description: قائمة المنتجات في العربة
 *       401:
 *         description: غير مصرح له
 */

/**
 * @swagger
 * /user/{id}/orders:
 *   get:
 *     summary: جلب طلبات مستخدم معين
 *     tags: [Users, Orders]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف المستخدم (User ID)
 *     responses:
 *       200:
 *         description: قائمة الطلبات الخاصة بالمستخدم
 *       401:
 *         description: غير مصرح له
 */

userRouter.use("/:id/cartItems", cartRouter);
userRouter.use("/:id/orders", orderRouter);

export { userRouter };