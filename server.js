import express from "express";
import { bootstrap } from "./src/bootstrap.js";
import { stripeWebhook } from "./src/modules/controler/payment_controler.js";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import hpp from "hpp";
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import { globalLimiter } from "./src/middelwares/rateLimiter.js";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(helmet());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);
app.use(express.json({ limit: "20kb" }));

app.use("/api", globalLimiter);

// app.use(mongoSanitize());
// app.use(xss());

app.use(
  hpp({
    whitelist: ["type"],
  }),
);

bootstrap(app);
