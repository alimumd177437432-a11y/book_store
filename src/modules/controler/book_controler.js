import { ErrorHandler, SendError } from "../../services/errorhandeler.js";
import { BookModel } from "../models/book_model.js";
import { ImageModel } from "../models/book_model_Images.js";
export const bookAddingExexution = ErrorHandler(async (req, res) => {
  let bookImagePaths = [];
  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      if (i !== 0) {
        bookImagePaths.push(req.files[i].path);
      }
    }
  }
  const book = await req.Query;
  if (!book) throw new SendError(400, "Error in adding book");
  const result = await ImageModel.create({
    path: bookImagePaths,
    bookId: book._id,
  });
  if (!result) throw new SendError(400, "Error in adding book image");
  res.status(200).json({
    message: "success",
    data: book,
    images: result,
  });
});

export const updateBookModel = ErrorHandler(async (req, res) => {
  if (req.files.prevImage) {
    req.body.minPrivImage = req.files.prevImage[0].path;
  }
  let bookImagePaths = [];
  if (req.files.Image) {
    for (let i = 0; i < req.files.Image.length; i++) {
      bookImagePaths.push(req.files.Image[i].path);
    }
    const addBookImages = await ImageModel.updateOne(
      { bookId: req.params.id },
      { path: bookImagePaths },
    );
  }
  const result = await BookModel.updateOne({ _id: req.params.id }, req.body);
  if (!result) throw new SendError(400, "error in updating book");
  res.status(200).json({
    message: "success",
    data: result,
  });
});

