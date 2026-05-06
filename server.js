import express from "express"
import { bootstrap } from "./src/bootstrap.js";
import { stripeWebhook } from "./src/modules/controler/payment_controler.js";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config(); 

const app = express()
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); 
}
app.post(
  "/webhook", 
  express.raw({ type: "application/json" }), 
  stripeWebhook
);
app.use(express.json())

bootstrap(app)

