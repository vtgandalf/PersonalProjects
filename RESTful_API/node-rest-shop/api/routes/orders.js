const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/chech-auth');
const OrdersController = require('../controllers/orders');

router.get('/', checkAuth, OrdersController.orders_get_all);
router.post('/', checkAuth, OrdersController.orders_post);
router.get('/:orderId', OrdersController.orders_get_one);
router.delete('/:orderId', checkAuth, OrdersController.orders_get_one);

module.exports = router;