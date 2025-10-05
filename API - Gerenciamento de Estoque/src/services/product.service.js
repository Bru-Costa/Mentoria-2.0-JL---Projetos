const { v4: uuid } = require('uuid');

const inventory = [];

function validateProductPayload(payload) {
  const errors = [];
  if (!payload || typeof payload !== 'object') errors.push('Payload inválido');
  if (!payload.name || typeof payload.name !== 'string') errors.push('Campo name é obrigatório');
  if (!payload.sku || typeof payload.sku !== 'string') errors.push('Campo sku é obrigatório');
  if (payload.quantity == null || typeof payload.quantity !== 'number' || payload.quantity < 0) errors.push('Campo quantity deve ser número >= 0');
  if (payload.price == null || typeof payload.price !== 'number' || payload.price < 0) errors.push('Campo price deve ser número >= 0');
  if (errors.length) throw new Error(errors.join('; '));
}

function createProduct({ name, sku, quantity = 0, price = 0 }) {
  validateProductPayload({ name, sku, quantity, price });
  const exists = inventory.find(p => p.sku === sku);
  if (exists) throw new Error('Produto com este SKU já existe');
  const product = { id: uuid(), name, sku, quantity, price, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  inventory.push(product);
  return product;
}

function getAllProducts() {
  return inventory;
}

function findIndexById(id) {
  return inventory.findIndex(p => p.id === id);
}

function deleteProductById(id) {
  const index = findIndexById(id);
  if (index === -1) throw new Error('Produto não encontrado');
  inventory.splice(index, 1);
}

function updateQuantity(id, { delta, set }) {
  const index = findIndexById(id);
  if (index === -1) {
    const err = new Error('Produto não encontrado');
    err.code = 'NOT_FOUND';
    throw err;
  }
  const product = inventory[index];
  if (typeof set === 'number') {
    if (set < 0) throw new Error('Quantidade não pode ser negativa');
    product.quantity = set;
  } else if (typeof delta === 'number') {
    const next = product.quantity + delta;
    if (next < 0) throw new Error('Resultado da operação deixaria quantidade negativa');
    product.quantity = next;
  } else {
    throw new Error('Forneça "delta" (incremento/decremento) ou "set" (valor absoluto)');
  }
  product.updatedAt = new Date().toISOString();
  return product;
}

module.exports = {
  createProduct,
  getAllProducts,
  deleteProductById,
  updateQuantity,
  // exported for testing/inspection only
  __store: inventory,
};


