const mongoose = require('mongoose');
const Product = require('../models/product');

exports.products_get_all = (req, res, next) => {
    Product.find()
        .select('name price _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return{
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request:{
                            type: 'GET',
                            url: 'http://localhost:3000/products/'+doc._id
                        }
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.products_post = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Created product sucessfully',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request:{
                    type: 'GET',
                    url: 'http://localhost:3000/products/'+result._id
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

exports.products_get_one = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('name price _id')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    response:{
                        product: doc,
                        request:{
                            type: 'GET',
                            description: 'Get all products',
                            url: 'http://localhost:3000/products'
                        }
                    }
                });
            }
            else {
                res.status(404).json({
                    message: 'No valid entry found for provided ID'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.products_patch = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body)
    {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, { $set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Product updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products/'+id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.products_delete = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product deleted',
                request: {
                    type: 'PATCH',
                    url: 'http://localhost:3000/products',
                    body: { 
                        name: 'String', 
                        price: 'Number'
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};