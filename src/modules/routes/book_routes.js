import { Router } from "express";
import { addMiddelware, deleteMiddelware, getMiddelware, putMiddelware } from "../../middelwares/query_middelwares.js";
import { BookModel } from "../models/book_model.js";
import { execute } from "../../middelwares/execute_middelware.js";
import { filterMiddleware , paginationMiddelware, selectMiddelware } from "../../middelwares/featuears_middelware.js";
import {  catchPrevImage, convertTitleToSlug, deleteImagesBook } from "../middelwares/slug_middelwares.js";
import { upload } from "../../utils/multer/multer.js";
import { bookAddingExexution, updateBookModel } from "../controler/book_controler.js";

const bookRouter = Router()

bookRouter.post("/",upload.array("Image"),catchPrevImage,convertTitleToSlug,addMiddelware(BookModel) ,bookAddingExexution)
bookRouter.get("/",getMiddelware(BookModel) ,selectMiddelware("title description minPrivImage price"), paginationMiddelware(),execute)
bookRouter.put("/", putMiddelware(BookModel) , execute)
bookRouter.delete("/", deleteMiddelware(BookModel) , execute)
// get one ,and put one , delete one
bookRouter.get("/:id", getMiddelware(BookModel),filterMiddleware ("_id" , "id"), execute)
bookRouter.put("/:id",upload.fields([
    { name: 'prevImage', maxCount: 1 }, 
    { name: 'Image', maxCount: 10 }
  ]),convertTitleToSlug ,updateBookModel)
bookRouter.delete("/:id", deleteMiddelware(BookModel),filterMiddleware ("_id" , "id") ,deleteImagesBook, execute)
export {bookRouter} 