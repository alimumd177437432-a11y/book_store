import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book Store API",
      version: "1.0.0",
      description: "API documentation for Book Store project",
    },
    servers: [
      {
        url: "https://book-store-dx00.onrender.com/api/v1",
        description: "Production server",
      },
      {
        url: "http://localhost:4000/api/v1",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        tokenAuth: {
          type: "apiKey",
          in: "header",
          name: "token",
        },
      },
      schemas: {
        Book: {
          type: "object",
          properties: {
            _id: { type: "string", example: "664f1b2c9e1a2b3c4d5e6f7a" },
            title: { type: "string", example: "Clean Code" },
            slug: { type: "string", example: "clean-code" },
            description: { type: "string", example: "كتاب عن كتابة كود نظيف" },
            type: { type: "string", enum: ["printed", "digital"], example: "printed" },
            minPrivImage: { type: "string", example: "uploads/books/cover.jpg" },
            retingAvg: { type: "number", example: 4.5 },
            price: { type: "number", example: 29.99 },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        BookImages: {
          type: "object",
          properties: {
            _id: { type: "string" },
            bookId: { type: "string" },
            path: {
              type: "array",
              items: { type: "string" },
              example: ["uploads/1.jpg", "uploads/2.jpg"],
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Error message here" },
          },
        },
        SuccessMeta: {
          type: "object",
          properties: {
            hasNext: { type: "boolean" },
            hasprev: { type: "boolean" },
            currentPage: { type: "integer" },
            NumOfPages: { type: "integer" },
            totalRows: { type: "integer" },
            limit: { type: "string" },
            page: { type: "integer" },
          },
        },
      },
    },
  },
  apis: ["./src/modules/routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
export const swaggerUiServe = swaggerUi.serve;
export const swaggerUiSetup = swaggerUi.setup(swaggerSpec);