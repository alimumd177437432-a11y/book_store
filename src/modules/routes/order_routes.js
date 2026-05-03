import { Router } from "express";
import { passUserIdMiddelware } from "../controler/cart_controler.js";
import { orderModel } from "../models/order_model.js";
import { authentication, authoriziation } from "../../middelwares/auth_middelware.js";
import {
  addMiddelware,
  deleteMiddelware,
  getMiddelware,
  putMiddelware,
} from "../../middelwares/query_middelwares.js";
import { execute } from "../../middelwares/execute_middelware.js";
import {
  filterMiddleware,
  paginationMiddelware,
} from "../../middelwares/featuears_middelware.js"
import { clearCart, passUserId } from "../middelwares/order_middelware.js";
import { cancelOrder, getMyOrders, makeOrder } from "../controler/order_controler.js";
// import { createCheckoutSession } from "../controler/payment_controler.js";


const orderRouter = Router({ mergeParams: true });

orderRouter.post(
  "/",authentication,passUserId,makeOrder,addMiddelware(orderModel),clearCart,execute,);
orderRouter.get("/", authentication, getMyOrders, execute);
orderRouter.get("/all",authentication, authoriziation("admin"),getMiddelware(orderModel), execute, );
orderRouter.put("/status/:id", authentication, authoriziation("admin"),putMiddelware(orderModel),execute);
orderRouter.put("/cancel/:id", authentication, cancelOrder, execute );


export { orderRouter };
