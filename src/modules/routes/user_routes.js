import { Router } from "express";
import { execute } from "../../middelwares/execute_middelware.js";
import { addForResetPassword, getMyAcountData, login, newpassword, signup, updateAcount, updatePassword, verifyEmial } from "../controler/user_controler.js";
import { deleteMiddelware, getMiddelware, putMiddelware } from "../../middelwares/query_middelwares.js";
import { userModel } from "../models/user_model.js";
import { filterMiddleware } from "../../middelwares/featuears_middelware.js";
import { authentication, authoriziation } from "../../middelwares/auth_middelware.js";
import { cartRouter } from "./cart_routes.js";
import { orderRouter } from "./order_routes.js";

const userRouter = Router({mergeParams : true})
userRouter.post("/signup" , signup)
userRouter.post("/login" , login)
userRouter.get("/verify/:token" , verifyEmial )
userRouter.put("/" , authentication  , updateAcount )
userRouter.put("/pass" , authentication , updatePassword )
userRouter.get("/", authentication,getMyAcountData )
userRouter.post("/ask-reset-password", addForResetPassword)
userRouter.post("/reset-password/:otpToken", newpassword)
userRouter.use("/:id/cartItems" , cartRouter) 
userRouter.use("/:id/orders", orderRouter);

export {userRouter}
