import { ErrorHandler, SendError } from "../../services/errorhandeler.js";
import { cartModel } from "../models/cart_model.js";

export const passUserId = ErrorHandler(async(req , res , next)=> {
    if(req.user.id) {
        req.body.userId = req.user.id
        next()
    }else {
        throw new SendError(400 , "user id is required")
    }
})

export const clearCart = ErrorHandler(async (req, res, next) => {
  const userId = req.user.id;

  await cartModel.deleteMany({ userId });

  next();
});