const { Router } = require('express');
const productController = require('../controllers/product.controller');

const router = Router();

router.get('/', productController.listProducts);
router.post('/', productController.createProduct);
router.delete('/:id', productController.deleteProduct);
router.patch('/:id/quantity', productController.updateProductQuantity);

module.exports = router;


