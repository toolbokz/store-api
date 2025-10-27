const express = require('express');
const router = express.Router();

const {
    getAllProducts,
    getAllProductsStatic,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/products');

// Main routes
router.route('/')
    .get(getAllProducts)
    .post(createProduct);

// Static test route
router.route('/static')
    .get(getAllProductsStatic);

// Single product routes
router.route('/:id')
    .get(getProduct)
    .patch(updateProduct)
    .delete(deleteProduct);

module.exports = router;