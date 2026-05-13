import { Router } from "express";
import { passUserIdMiddelware } from "../controler/cart_controler.js";
import { orderModel } from "../models/order_model.js";
import { authentication, authoriziation } from "../../middelwares/auth_middelware.js";
import { addMiddelware, deleteMiddelware, getMiddelware, putMiddelware } from "../../middelwares/query_middelwares.js";
import { execute } from "../../middelwares/execute_middelware.js";
import { filterMiddleware, paginationMiddelware } from "../../middelwares/featuears_middelware.js";
import { clearCart, passUserId } from "../middelwares/order_middelware.js";
import { cancelOrder, getMyOrders, makeOrder } from "../controler/order_controler.js";
// import { validate } from "../../validators/validate.js";
// import { createOrderSchema, updateOrderStatusSchema } from "../../validators/order.validator.js";

const orderRouter = Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: إدارة الطلبات
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       properties:
 *         bookId:
 *           type: string
 *           example: "664f1b2c9e1a2b3c4d5e6f7c"
 *         count:
 *           type: number
 *           example: 2
 *         price:
 *           type: number
 *           example: 29.99
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "664f1b2c9e1a2b3c4d5e6f7a"
 *         userId:
 *           type: string
 *           example: "664f1b2c9e1a2b3c4d5e6f7b"
 *         orderItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         totalPrice:
 *           type: number
 *           example: 59.98
 *         totalAmount:
 *           type: number
 *           example: 2
 *         status:
 *           type: string
 *           enum: [pending, confirmed, shipped, delivered, cancelled]
 *           example: pending
 *         paymentStatus:
 *           type: string
 *           enum: [unpaid, paid, refunded]
 *           example: unpaid
 *         paymentMethods:
 *           type: string
 *           enum: [cash, online]
 *           example: online
 *         address:
 *           type: object
 *           properties:
 *             governorate:
 *               type: string
 *               example: "Gaza"
 *             street:
 *               type: string
 *               example: "Al-Nasser St"
 *             description:
 *               type: string
 *               example: "Near the mosque"
 *             phone:
 *               type: string
 *               example: "0599999999"
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: إنشاء طلب جديد من السلة
 *     tags: [Orders]
 *     security:
 *       - tokenAuth: []
 *     description: |
 *       بيجمع كل عناصر السلة ويعمل منها طلب، وبعدين يمسح السلة تلقائياً
 *
 *       الـ userId بييجي تلقائياً من التوكن
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: object
 *                 properties:
 *                   governorate:
 *                     type: string
 *                     example: "Gaza"
 *                   street:
 *                     type: string
 *                     example: "Al-Nasser St"
 *                   description:
 *                     type: string
 *                     example: "Near the mosque"
 *                   phone:
 *                     type: string
 *                     example: "0599999999"
 *               paymentMethods:
 *                 type: string
 *                 enum: [cash, online]
 *                 example: online
 *     responses:
 *       200:
 *         description: تم إنشاء الطلب بنجاح
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: السلة فارغة
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: غير مصرح
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
orderRouter.post("/", authentication, passUserId, makeOrder, addMiddelware(orderModel), clearCart, execute);

/**
 * @swagger
 * /user/{id}/orders:
 *   get:
 *     summary: جلب طلباتي
 *     tags: [Orders]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: الـ ID الخاص باليوزر
 *     responses:
 *       200:
 *         description: قائمة الطلبات
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       401:
 *         description: غير مصرح
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
orderRouter.get("/", authentication, getMyOrders, execute);

/**
 * @swagger
 * /user/{id}/orders/all:
 *   get:
 *     summary: جلب كل الطلبات — للأدمن فقط
 *     tags: [Orders]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: كل الطلبات
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       403:
 *         description: ممنوع — ليس أدمن
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
orderRouter.get("/all", authentication, authoriziation("admin"), getMiddelware(orderModel), execute);

/**
 * @swagger
 * /user/{id}/orders/status/{orderId}:
 *   put:
 *     summary: تغيير حالة الطلب — للأدمن فقط
 *     tags: [Orders]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: الـ ID الخاص بالطلب
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, shipped, delivered, cancelled]
 *                 example: shipped
 *     responses:
 *       200:
 *         description: تم تغيير الحالة بنجاح
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *       403:
 *         description: ممنوع — ليس أدمن
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
orderRouter.put("/status/:id", authentication, authoriziation("admin"),putMiddelware(orderModel), execute);

/**
 * @swagger
 * /order/cancel/{id}:
 *   put:
 *     summary: إلغاء طلب
 *     tags: [Orders]
 *     security:
 *       - tokenAuth: []
 *     description: بيقدر اليوزر يلغي طلبه بس إذا كان حالته pending
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: الـ ID الخاص بالطلب
 *     responses:
 *       200:
 *         description: تم الإلغاء بنجاح
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order cancelled successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: لا يمكن الإلغاء — الطلب مش pending
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: غير مصرح
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
orderRouter.put("/cancel/:id", authentication, cancelOrder, execute);

export { orderRouter };