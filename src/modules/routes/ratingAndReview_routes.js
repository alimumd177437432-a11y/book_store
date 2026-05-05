import { Router } from "express";
import { authentication } from "../../middelwares/auth_middelware.js";
import { addReview, deleteReview, getAllReviewsForBook, updateReview } from "../controler/ratingAndReview_controler.js";
import { reviewMiddelware } from "../middelwares/ratingandreview_middelware.js";

const ratingRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: تقييمات ومراجعات الكتب
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "664f1b2c9e1a2b3c4d5e6f7a"
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           example: 4
 *         review:
 *           type: string
 *           example: "كتاب ممتاز، أنصح فيه"
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
 * /reviews:
 *   post:
 *     summary: إضافة تقييم لكتاب
 *     tags: [Reviews]
 *     security:
 *       - tokenAuth: []
 *     description: |
 *       **شروط:**
 *       - لازم تكون اشتريت الكتاب وحالة الطلب delivered
 *       - ما تقدر تقيّم نفس الكتاب مرتين
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - bookId
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4
 *               review:
 *                 type: string
 *                 example: "كتاب ممتاز، أنصح فيه"
 *               bookId:
 *                 type: string
 *                 example: "664f1b2c9e1a2b3c4d5e6f7c"
 *     responses:
 *       201:
 *         description: تمت الإضافة بنجاح وتم تحديث متوسط التقييم
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Review added and book rating updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Review'
 *       400:
 *         description: قيّمت هذا الكتاب من قبل
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: ما اشتريت هذا الكتاب أو ما وصلك بعد
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
ratingRouter.post("/", authentication, addReview);

/**
 * @swagger
 * /reviews/{bookId}:
 *   get:
 *     summary: جلب كل تقييمات كتاب معين
 *     tags: [Reviews]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: الـ ID الخاص بالكتاب
 *         example: "664f1b2c9e1a2b3c4d5e6f7c"
 *     responses:
 *       200:
 *         description: قائمة التقييمات
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reviews fetched successfully"
 *                 results:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 *       404:
 *         description: الكتاب غير موجود
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
ratingRouter.get("/:bookId", authentication, getAllReviewsForBook);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: حذف تقييم
 *     tags: [Reviews]
 *     security:
 *       - tokenAuth: []
 *     description: بيقدر يحذف صاحب التقييم بس
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: الـ ID الخاص بالتقييم
 *         example: "664f1b2c9e1a2b3c4d5e6f7a"
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
 *                   example: "Review deleted successfully"
 *       403:
 *         description: غير مصرح — مش صاحب التقييم
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: التقييم غير موجود
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
ratingRouter.delete("/:id", authentication, reviewMiddelware, deleteReview);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: تعديل تقييم
 *     tags: [Reviews]
 *     security:
 *       - tokenAuth: []
 *     description: بيقدر يعدل صاحب التقييم بس
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: الـ ID الخاص بالتقييم
 *         example: "664f1b2c9e1a2b3c4d5e6f7a"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               review:
 *                 type: string
 *                 example: "بعد إعادة القراءة، كتاب ممتاز جداً!"
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
 *                   example: "Review updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Review'
 *       403:
 *         description: غير مصرح — مش صاحب التقييم
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: التقييم غير موجود
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
ratingRouter.put("/:id", authentication, reviewMiddelware, updateReview);

export { ratingRouter };