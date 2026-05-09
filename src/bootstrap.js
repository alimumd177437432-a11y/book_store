import cors from "cors";
import swaggerUi from "swagger-ui-express";
import {
  swaggerSpec,
  swaggerUiServe,
  swaggerUiSetup,
} from "../src/utils/swagger.js";
import dotenv from "dotenv";
import { DBconection } from "./DBconection.js";
import { v1Router } from "./v1_routes.js";
import logger from "./utils/logger.js";
import express from "express";

dotenv.config();

const port = process.env.PORT || 4000;
export const bootstrap = async (app) => {
  app.use(cors());
  app.use((req, res, next) => {
    logger.info(`طلب جديد: ${req.method} على المسار ${req.url}`);
    next();
  });
  app.use("/uploads", express.static("public/books"));
  app.use("/api-docs", swaggerUiServe, swaggerUiSetup);
  app.use("/api/v1", v1Router);
  
 
  app.use((error, req, res, next) => {
    logger.error(`فشل الطلب: ${req.method} ${req.url} - الرسالة: ${error.message}`);
    const message = error.message;
    const status = error.status || 500;
    res.status(status).json({ message });
  });
  await DBconection();

  app.listen(port, "0.0.0.0", () => {
    logger.info("Server is running on port 4000");
  });
};
