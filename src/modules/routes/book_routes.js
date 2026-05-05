import { Router } from "express";
import { addMiddelware, deleteMiddelware, getMiddelware, putMiddelware } from "../../middelwares/query_middelwares.js";
import { BookModel } from "../models/book_model.js";
import { execute } from "../../middelwares/execute_middelware.js";
import { filterMiddleware , paginationMiddelware, selectMiddelware } from "../../middelwares/featuears_middelware.js";
import {  catchPrevImage, convertTitleToSlug, deleteImagesBook } from "../middelwares/slug_middelwares.js";
import { upload } from "../../utils/multer/multer.js";
import { bookAddingExexution, updateBookModel } from "../controler/book_controler.js";

const bookRouter = Router()
/**
 * @swagger
 * /book:
 *   post:
 *     summary: إضافة كتاب جديد (مع رفع صور)
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: تم إضافة الكتاب بنجاح
 *   get:
 *     summary: جلب كل الكتب (Pagination)
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: تم جلب القائمة بنجاح
 *   put:
 *     summary: تعديل جماعي للكتب
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: تم التعديل بنجاح
 *   delete:
 *     summary: حذف كل الكتب
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: تم الحذف بنجاح
 */

bookRouter.post("/",upload.array("Image"),catchPrevImage,convertTitleToSlug,addMiddelware(BookModel) ,bookAddingExexution)
bookRouter.get("/",getMiddelware(BookModel) ,selectMiddelware("title description minPrivImage price"), paginationMiddelware(),execute)
bookRouter.put("/", putMiddelware(BookModel) , execute)
bookRouter.delete("/", deleteMiddelware(BookModel) , execute)
/**
 * @swagger
 * /book/{id}:
 *   get:
 *     summary: جلب كتاب واحد بواسطة الـ ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف الكتاب (Object ID)
 *     responses:
 *       200:
 *         description: تم العثور على الكتاب
 *   put:
 *     summary: تحديث بيانات كتاب محدد وصوره
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: تم التحديث بنجاح
 *   delete:
 *     summary: حذف كتاب محدد
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: تم الحذف بنجاح
 */
// get one ,and put one , delete one
bookRouter.get("/:id", getMiddelware(BookModel),filterMiddleware ("_id" , "id"), execute)
bookRouter.put("/:id",upload.fields([
    { name: 'prevImage', maxCount: 1 }, 
    { name: 'Image', maxCount: 10 }
  ]),convertTitleToSlug ,updateBookModel)
bookRouter.delete("/:id", deleteMiddelware(BookModel),filterMiddleware ("_id" , "id") ,deleteImagesBook, execute)
export {bookRouter} 