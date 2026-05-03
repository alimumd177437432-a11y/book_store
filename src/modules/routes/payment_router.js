import { Router } from "express";
import { authentication } from "../../middelwares/auth_middelware.js";
import { createCheckoutSession } from "../controler/payment_controler.js";

const paymentRouter = Router();

paymentRouter.post("/:orderId", authentication, createCheckoutSession);
paymentRouter.get("/success", (req, res) => {
  res.send(`
    <div style="text-align: center; margin-top: 50px; font-family: sans-serif;">
      <h1 style="color: green;">✔️ تمت عملية الدفع بنجاح!</h1>
      <p>شكراً لشرائك من متجرنا. يمكنك إغلاق هذه التبويبة الآن.</p>
    </div>
  `);
});

export { paymentRouter };