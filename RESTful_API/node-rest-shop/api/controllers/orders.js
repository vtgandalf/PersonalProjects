const mongoose = require('mongoose');
const Product = require('../models/product');
const Order = require('../models/order');

exports.orders_get_all = (req, res, next) => {
    Order.find()
        .populate('product', '_id name')
        .exec()
        .then(x => {
            console.log(x);
            res.status(200).json({
                count: x.length,
                orders: x.map(y => {
                    return {
                        _id: y._id,
                        product: y.product,
                        quantity: y.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + y._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            })
        });
};

exports.orders_post = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found'
                });
            }
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            })
            return order.save()

        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Order created sucessfully',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity,
                    response: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            });
        });
};

exports.orders_get_one = (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id)
        .select('_id product quantity')
        .populate('product', '_id name price')
        .exec()
        .then(x => {
            if (!x) {
                return res.status(404).json({
                    message: 'Order not found'
                });
            }
            console.log(x);
            res.status(200).json({
                response: {
                    order: x,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders'
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            })
        });
};

exports.orders_delete_one = (req, res, next) => {
    const id = req.params.orderId;
    Order.remove({ _id: id })
        .exec()
        .then(x => {
            console.log(x);
            res.status(200).json({
                message: 'Order deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/orders',
                    body: {
                        productId: "ID",
                        quantity: "Number"
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
};