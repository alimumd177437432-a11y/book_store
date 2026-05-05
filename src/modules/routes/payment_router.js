import { Router } from "express";
import { authentication } from "../../middelwares/auth_middelware.js";
import { createCheckoutSession } from "../controler/payment_controler.js";

const paymentRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: الدفع عبر Stripe
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PaymentSession:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Checkout session created"
 *         url:
 *           type: string
 *           example: "https://checkout.stripe.com/pay/cs_test_..."
 *         order:
 *           $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /payment/{orderId}:
 *   post:
 *     summary: إنشاء جلسة دفع Stripe
 *     tags: [Payment]
 *     security:
 *       - tokenAuth: []
 *     description: |
 *       بيرجع رابط Stripe Checkout — افتحه في المتصفح وادفع
 *
 *       **ملاحظة:** بعد الدفع بيتبعت webhook تلقائياً لتحديث حالة الطلب إلى paid
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: الـ ID الخاص بالطلب
 *         example: "664f1b2c9e1a2b3c4d5e6f7a"
 *     responses:
 *       200:
 *         description: تم إنشاء جلسة الدفع بنجاح
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentSession'
 *       400:
 *         description: الطلب مدفوع مسبقاً
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: هذا الطلب مش إلك
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: الطلب غير موجود
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
paymentRouter.post("/:orderId", authentication, createCheckoutSession);

/**
 * @swagger
 * /payment/success:
 *   get:
 *     summary: صفحة نجاح الدفع
 *     tags: [Payment]
 *     description: Stripe بيرجع اليوزر لهذا الرابط بعد الدفع تلقائياً
 *     parameters:
 *       - in: query
 *         name: orderId
 *         schema:
 *           type: string
 *         description: الـ ID الخاص بالطلب
 *       - in: query
 *         name: session_id
 *         schema:
 *           type: string
 *         description: الـ ID الخاص بجلسة Stripe
 *     responses:
 *       200:
 *         description: صفحة HTML تأكيد الدفع
 */
paymentRouter.get("/success", (req, res) => {
  res.send(`
    <div style="text-align: center; margin-top: 50px; font-family: sans-serif;">
      <h1 style="color: green;">✔️ تمت عملية الدفع بنجاح!</h1>
      <p>شكراً لشرائك من متجرنا. يمكنك إغلاق هذه التبويبة الآن.</p>
    </div>
  `);
});

export { paymentRouter };