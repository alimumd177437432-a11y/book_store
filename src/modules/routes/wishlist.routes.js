import { Router } from "express";
import { authentication } from "../../middelwares/auth_middelware.js";
import { addToWishlist, getMyWishlist, removeFromWishlist } from "../controler/wishlist_controler.js";
const wishlistRouter = Router();
wishlistRouter.post("/" , authentication , addToWishlist)
wishlistRouter.delete("/:id", authentication, removeFromWishlist);
wishlistRouter.get("/", authentication, getMyWishlist);

export { wishlistRouter };
