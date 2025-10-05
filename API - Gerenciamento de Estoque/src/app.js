const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const productRoutes = require('./routes/product.routes');
const { swaggerUiMiddleware, swaggerSpec } = require('./config/swagger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/products', productRoutes);
app.use('/api-docs', swaggerUiMiddleware.serve, swaggerUiMiddleware.setup(swaggerSpec));

app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

module.exports = app;


