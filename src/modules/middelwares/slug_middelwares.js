import slugify from "slugify";
import { ErrorHandler, SendError } from "../../services/errorhandeler.js";
import { ImageModel } from "../models/book_model_Images.js";
export const convertTitleToSlug = (req, res, next) => {
  const { title } = req.body;
  if (!title) return next();
  req.body.slug = slugify(title);
  next();
};
export const catchPrevImage = (req, res, next) => {
  if (req.files && req.files.length > 0) {
    req.body.minPrivImage = req.files[0].path;
    next();
  } else {
    return next(new SendError(400, "prevImage is required"));
  }
};

export const deleteImagesBook = ErrorHandler(async (req, res,next) => {
  const { id } = req.params;
  const deleteImages = await ImageModel.deleteMany({ bookId: id });
  if (!deleteImages) throw new SendError(404, "Book not found");
  next()
});

