import { Router } from "express";
import { passUserIdMiddelware } from "../controler/cart_controler.js";
import { cartModel } from "../models/cart_model.js";
import { authentication } from "../../middelwares/auth_middelware.js";
import { addMiddelware, deleteMiddelware, getMiddelware, putMiddelware } from "../../middelwares/query_middelwares.js";
import { execute } from "../../middelwares/execute_middelware.js";
import { filterMiddleware, paginationMiddelware } from "../../middelwares/featuears_middelware.js";
import { validate } from "../../validators/validate.js";
import { addToCartSchema, updateCartSchema } from "../../validators/cart.validator.js";

const cartRouter = Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: إدارة سلة التسوق
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "664f1b2c9e1a2b3c4d5e6f7a"
 *         userId:
 *           type: string
 *           example: "664f1b2c9e1a2b3c4d5e6f7b"
 *         bookId:
 *           type: string
 *           example: "664f1b2c9e1a2b3c4d5e6f7c"
 *         count:
 *           type: number
 *           example: 2
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
/**
 * @swagger
 * /cart:
 *   post:
 *     summary: إضافة كتاب للسلة
 *     tags: [Cart]
 *     security:
 *       - tokenAuth: []
 *     description: الـ userId بييجي تلقائياً من التوكن
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - count
 *             properties:
 *               bookId:
 *                 type: string
 *                 example: "664f1b2c9e1a2b3c4d5e6f7c"
 *               count:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: تمت الإضافة بنجاح
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/CartItem'
 *       401:
 *         description: غير مصرح
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
cartRouter.post("/", authentication, passUserIdMiddelware, addMiddelware(cartModel), execute);

/**
 * @swagger
 * /cart/{id}:
 *   put:
 *     summary: تعديل كمية عنصر في السلة
 *     tags: [Cart]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: الـ ID الخاص بعنصر السلة
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               count:
 *                 type: number
 *                 example: 3
 *     responses:
 *       200:
 *         description: تم التعديل بنجاح
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
 *       401:
 *         description: غير مصرح
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
cartRouter.put("/:id", authentication, validate(updateCartSchema), putMiddelware(cartModel), filterMiddleware("_id", "id"), execute);

/**
 * @swagger
 * /cart/{id}:
 *   delete:
 *     summary: حذف عنصر واحد من السلة
 *     tags: [Cart]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: الـ ID الخاص بعنصر السلة
 *     responses:
 *       200:
 *         description: تم الحذف بنجاح
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
 *       401:
 *         description: غير مصرح
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
cartRouter.delete("/:id", authentication, deleteMiddelware(cartModel), filterMiddleware("_id", "id"), execute);

/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: حذف كل عناصر السلة
 *     tags: [Cart]
 *     security:
 *       - tokenAuth: []
 *     responses:
 *       200:
 *         description: تم حذف السلة بالكامل
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
 *       401:
 *         description: غير مصرح
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
cartRouter.delete("/", authentication, deleteMiddelware(cartModel), execute);

/**
 * @swagger
 * /user/{id}/cartItems:
 *   get:
 *     summary: جلب كل عناصر سلة يوزر معين
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: الـ ID الخاص باليوزر
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: عناصر السلة
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 meta:
 *                   $ref: '#/components/schemas/SuccessMeta'
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CartItem'
 */
cartRouter.get("/", getMiddelware(cartModel), filterMiddleware("userId", "id"), paginationMiddelware(), execute);

export { cartRouter };