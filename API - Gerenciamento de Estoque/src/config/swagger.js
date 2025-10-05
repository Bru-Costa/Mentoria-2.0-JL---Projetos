const swaggerUiMiddleware = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gerenciamento de Estoque - E-commerce',
      version: '1.0.0',
      description: 'API REST para estudos de Teste de Software. Armazenamento em memória.',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Local' },
    ],
  },
  apis: ['src/docs/*.yaml', 'src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUiMiddleware, swaggerSpec };


