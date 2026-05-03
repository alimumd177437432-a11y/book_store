import { Router } from "express";
import { bookRouter } from "./modules/routes/book_routes.js";
import { userRouter } from "./modules/routes/user_routes.js";
import { cartRouter } from "./modules/routes/cart_routes.js";
import { orderRouter } from "./modules/routes/order_routes.js";
import { wishlistRouter } from "./modules/routes/wishlist.routes.js";
import { ratingRouter } from "./modules/routes/ratingAndReview_routes.js";
import { paymentRouter } from "./modules/routes/payment_router.js";


const v1Router = Router()

v1Router.use("/book" , bookRouter)
v1Router.use("/user" , userRouter)
v1Router.use("/cart" , cartRouter)
v1Router.use("/order" , orderRouter)
v1Router.use("/wishlist" , wishlistRouter)
v1Router.use("/reviews", ratingRouter);
v1Router.use("/payment", paymentRouter);


export {v1Router}

