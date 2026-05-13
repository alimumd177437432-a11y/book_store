import { Router } from "express";
import { authentication } from "../../middelwares/auth_middelware.js";
import { addToWishlist, getMyWishlist, removeFromWishlist } from "../controler/wishlist_controler.js";
// import { validate } from "../../validators/validate.js";
// import { addToWishlistSchema } from "../../validators/wishlist.validator.js";

const wishlistRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: قائمة المفضلة
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     WishlistItem:
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
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /wishlist:
 *   post:
 *     summary: إضافة كتاب للمفضلة
 *     tags: [Wishlist]
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *             properties:
 *               bookId:
 *                 type: string
 *                 example: "664f1b2c9e1a2b3c4d5e6f7c"
 *     responses:
 *       201:
 *         description: تمت الإضافة بنجاح
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book added to your wishlist successfully ❤️"
 *                 data:
 *                   $ref: '#/components/schemas/WishlistItem'
 *       400:
 *         description: خطأ في الإضافة
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
wishlistRouter.post("/", authentication,  addToWishlist);

/**
 * @swagger
 * /wishlist/{id}:
 *   delete:
 *     summary: حذف كتاب من المفضلة
 *     tags: [Wishlist]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: الـ ID الخاص بالكتاب
 *         example: "664f1b2c9e1a2b3c4d5e6f7c"
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
 *                   example: "Book removed from wishlist successfully"
 *                 data:
 *                   $ref: '#/components/schemas/WishlistItem'
 *       404:
 *         description: الكتاب مش موجود في المفضلة
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
wishlistRouter.delete("/:id", authentication, removeFromWishlist);

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: جلب قائمة المفضلة
 *     tags: [Wishlist]
 *     security:
 *       - tokenAuth: []
 *     responses:
 *       200:
 *         description: قائمة المفضلة
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 count:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/WishlistItem'
 *       401:
 *         description: غير مصرح
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
wishlistRouter.get("/", authentication, getMyWishlist);

export { wishlistRouter };