import { ErrorHandler, SendError } from "../../services/errorhandeler.js";
import { wishlistModel } from "../models/wishlist_model.js";


// 1. إضافة كتاب للمفضلة (Add to Wishlist)
export const addToWishlist = ErrorHandler(async (req, res) => {
  const { bookId } = req.body;
  const userId = req.user.id;  

  const added = await wishlistModel.create({ userId, bookId });

  if (!added) throw new SendError(400, "Failed to add to wishlist");

  res.status(201).json({
    message: "Book added to your wishlist successfully ❤️",
    data: added,
  });
});

// 2. إزالة كتاب من المفضلة (Remove from Wishlist)
export const removeFromWishlist = ErrorHandler(async (req, res, next) => {
  const { id } = req.params; 
  const userId = req.user.id;
  const deleted = await wishlistModel.findOneAndDelete({ 
    bookId: id, 
    userId: userId 
  });
  if (!deleted) throw new SendError(404, "This book is not in your wishlist");
  res.status(200).json({
    message: "Book removed from wishlist successfully",
    data: deleted,
  });
});

// 3. عرض مفضلة اليوزر (Get My Wishlist)
export const getMyWishlist = ErrorHandler(async (req, res, next) => {
  const userId = req.user.id;
  const myWishlist = await wishlistModel.find({ userId }).populate({
    path: "bookId",
    select: "title price minPrivImage description", 
  });

  res.status(200).json({
    message: "Success",
    count: myWishlist.length, 
    data: myWishlist,
  });
});