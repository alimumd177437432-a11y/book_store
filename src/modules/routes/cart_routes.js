import { Router } from "express";
import { passUserIdMiddelware } from "../controler/cart_controler.js";
import { cartModel } from "../models/cart_model.js";
import { authentication } from "../../middelwares/auth_middelware.js";
import { addMiddelware , deleteMiddelware, getMiddelware, putMiddelware } from "../../middelwares/query_middelwares.js";
import { execute } from "../../middelwares/execute_middelware.js";
import { filterMiddleware, paginationMiddelware } from "../../middelwares/featuears_middelware.js";


const cartRouter = Router({mergeParams : true})

cartRouter.post("/" , authentication , passUserIdMiddelware , addMiddelware(cartModel) , execute)
cartRouter.put("/:id" , authentication , putMiddelware(cartModel) , filterMiddleware("_id" , "id") , execute)
cartRouter.delete("/:id" , authentication , deleteMiddelware(cartModel) , filterMiddleware("_id" , "id") , execute)
cartRouter.delete("/" , authentication , deleteMiddelware(cartModel) , execute)
cartRouter.get("/"  , getMiddelware(cartModel) , filterMiddleware("userId" , "id") ,paginationMiddelware(), execute)
//get all cart for user

export {cartRouter}