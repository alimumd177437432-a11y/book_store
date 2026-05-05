import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'Book Store API',
      version: '1.0.0',
      description:'توثيق مشروع متجر الكتب',
    },
    servers: [
      {
        url: 'https://book-store-dx00.onrender.com/api/v1',  
        description: 'Local Development Server',
      },
    ],
  },
  apis: ['./src/modules/routes/*.js'], 
};

export const specs = swaggerJsdoc(options);