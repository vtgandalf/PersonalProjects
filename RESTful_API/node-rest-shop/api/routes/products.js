const express = require('express');
const router = express.Router();
const chechAuth = require('../middleware/chech-auth');
const ProductsController = require('../controllers/products');

router.get('/', ProductsController.products_get_all);

router.post('/', chechAuth, ProductsController.products_post);

router.get('/:productId', ProductsController.products_get_one);

router.patch('/:productId', chechAuth, ProductsController.products_patch);

router.delete('/:productId', chechAuth, ProductsController.products_delete);

module.exports = router;