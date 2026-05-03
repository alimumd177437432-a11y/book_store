import express from "express"
import { bootstrap } from "./src/bootstrap.js";
import { stripeWebhook } from "./src/modules/controler/payment_controler.js";
import dotenv from "dotenv";
dotenv.config(); 

const app = express()
app.post(
  "/webhook", 
  express.raw({ type: "application/json" }), 
  stripeWebhook
);
app.use(express.json())

bootstrap(app)

