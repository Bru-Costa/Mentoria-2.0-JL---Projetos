const productService = require('../services/product.service');

function listProducts(_req, res) {
  const products = productService.getAllProducts();
  res.json(products);
}

function createProduct(req, res) {
  const { name, sku, quantity, price } = req.body || {};
  try {
    const created = productService.createProduct({ name, sku, quantity, price });
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    productService.deleteProductById(id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

function updateProductQuantity(req, res) {
  const { id } = req.params;
  const { delta, set } = req.body || {};
  try {
    const updated = productService.updateQuantity(id, { delta, set });
    res.json(updated);
  } catch (err) {
    res.status(err.code === 'NOT_FOUND' ? 404 : 400).json({ message: err.message });
  }
}

module.exports = {
  listProducts,
  createProduct,
  deleteProduct,
  updateProductQuantity,
};


