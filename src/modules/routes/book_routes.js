import { Router } from "express";
import { addMiddelware, deleteMiddelware, getMiddelware, putMiddelware } from "../../middelwares/query_middelwares.js";
import { BookModel } from "../models/book_model.js";
import { execute } from "../../middelwares/execute_middelware.js";
import { filterMiddleware, paginationMiddelware, selectMiddelware } from "../../middelwares/featuears_middelware.js";
import { catchPrevImage, convertTitleToSlug, deleteImagesBook } from "../middelwares/slug_middelwares.js";
import { upload } from "../../utils/multer/multer.js";
import { bookAddingExexution, updateBookModel } from "../controler/book_controler.js";
// import { validate } from "../../validators/validate.js";
// import { addBookSchema, updateBookSchema } from "../../validators/book.validator.js";

const bookRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: إدارة الكتب
 */

/**
 * @swagger
 * /book:
 *   post:
 *     summary: إضافة كتاب جديد
 *     tags: [Books]
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - type
 *               - price
 *               - Image
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Clean Code"
 *               description:
 *                 type: string
 *                 example: "كتاب عن كتابة كود نظيف"
 *               type:
 *                 type: string
 *                 enum: [printed, digital]
 *               price:
 *                 type: number
 *                 example: 29.99
 *               Image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: "أول صورة هي الغلاف، والباقي صور إضافية"
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
 *                   $ref: '#/components/schemas/Book'
 *                 images:
 *                   $ref: '#/components/schemas/BookImages'
 *       400:
 *         description: خطأ في البيانات
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
bookRouter.post("/", upload.array("Image"), catchPrevImage, convertTitleToSlug,  addMiddelware(BookModel), bookAddingExexution);

/**
 * @swagger
 * /book:
 *   get:
 *     summary: جلب جميع الكتب مع pagination
 *     tags: [Books]
 *     parameters:
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
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: "-createdAt"
 *         description: "مثال: -price أو createdAt"
 *     responses:
 *       200:
 *         description: قائمة الكتب
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
 *                     $ref: '#/components/schemas/Book'
 *       404:
 *         description: الصفحة غير موجودة
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
bookRouter.get("/", getMiddelware(BookModel), selectMiddelware("title description minPrivImage price"), paginationMiddelware(), execute);

/**
 * @swagger
 * /book:
 *   put:
 *     summary: تحديث جميع الكتب دفعة واحدة
 *     tags: [Books]
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               price: 19.99
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
 *                   type: object
 */
bookRouter.put("/", putMiddelware(BookModel), execute);

/**
 * @swagger
 * /book:
 *   delete:
 *     summary: حذف جميع الكتب
 *     tags: [Books]
 *     security:
 *       - tokenAuth: []
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
 */
bookRouter.delete("/", deleteMiddelware(BookModel), execute);

/**
 * @swagger
 * /book/{id}:
 *   get:
 *     summary: جلب كتاب واحد بالـ ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "664f1b2c9e1a2b3c4d5e6f7a"
 *     responses:
 *       200:
 *         description: بيانات الكتاب
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
 *                     $ref: '#/components/schemas/Book'
 *       404:
 *         description: الكتاب غير موجود
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
bookRouter.get("/:id", getMiddelware(BookModel), filterMiddleware("_id", "id"), execute);

/**
 * @swagger
 * /book/{id}:
 *   put:
 *     summary: تحديث كتاب واحد بالـ ID
 *     tags: [Books]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "664f1b2c9e1a2b3c4d5e6f7a"
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [printed, digital]
 *               price:
 *                 type: number
 *               prevImage:
 *                 type: string
 *                 format: binary
 *                 description: صورة الغلاف الجديدة (اختياري)
 *               Image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: الصور الإضافية الجديدة (اختياري)
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
 *                   type: object
 *       400:
 *         description: خطأ في التحديث
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
bookRouter.put("/:id", upload.fields([
  { name: "prevImage", maxCount: 1 },
  { name: "Image", maxCount: 10 },
]), convertTitleToSlug,updateBookModel);

/**
 * @swagger
 * /book/{id}:
 *   delete:
 *     summary: حذف كتاب واحد بالـ ID مع صوره
 *     tags: [Books]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *                   example: success
 *                 data:
 *                   type: object
 *       404:
 *         description: الكتاب غير موجود
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
bookRouter.delete("/:id", deleteMiddelware(BookModel), filterMiddleware("_id", "id"), deleteImagesBook, execute);

export { bookRouter };