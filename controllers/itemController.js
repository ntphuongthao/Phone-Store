const Item = require('../models/item');
const Brand = require('../models/brand');
const Category = require('../models/category');
const async = require('async');
const mongoose = require('mongoose');
const { body, check, validationResult } = require('express-validator');

exports.index = (req, res, next) => {
    async.parallel(
        {
            brands(callback) {
                Brand.find({}).sort({ name: 1}).exec(callback)
            },
            categories(callback) {
                Category.find({}).sort({ name: 1}).exec(callback)
            },
            items(callback) {
                Item.find({}).sort({ name: 1}).populate("brand").populate("category").exec(callback)
            }
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            res.render('./item/index', {
                brands: results.brands,
                categories: results.categories,
                items: results.items,
            });
        }
    );
}

exports.item_list = (req, res, next) => {
    Item.find({})
        .sort({ name: 1})
        .populate("brand")
        .populate("category")
        .exec(function(err, items) {
            if (err) {
                return next(err);
            }
            res.render('./item/item_list', {
                items: items,
            })
        });
}

exports.item_detail = (req, res, next) => {
    const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValid) {
        var err = new Error("Item not found!");
        err.status = 404;
        return next(err);
    }
    Item.findById(req.params.id)
        .populate("brand")
        .populate("category")
        .exec(function(err, item) {
            if (err) {
                return next(err);
            }
            res.render("./item/item_detail", {
                item: item,
            });
        });
}

exports.item_create_get = (req, res, next) => {
    async.parallel(
        {
            brands(callback) {
                Brand.find(callback);
            },
            categories(callback) {
                Category.find(callback);
            },
        },
        function(err, results) {
            if (err) {
                return next(err);
            }
            res.render("./item/item_form", {
                title: "Create a new Book",
                brands: results.brands,
                categories: results.categories,
            });
        }
    )
}

exports.item_create_post = [
    body("name", "Name of the item must be specified")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("brand", "Brand must be attached")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("description")
        .trim()
        .isLength({ min: 5 })
        .escape(),
    check("numberInStock")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    check("category.*").escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        const item = new Item({
            name: req.body.name,
            brand: req.body.brand,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            numberInStock: req.body.numberInStock,
            image: req.body.image,
        });

        if (!errors.isEmpty()) {
            async.parallel(
                {
                    brands(callback) {
                        Brand.find(callback);
                    },
                    categories(callback) {
                        Category.find(callback);
                    }
                },
                (err, results) => {
                    if (err) {
                        return next(err);
                    }

                    res.render("./item/item_form", {
                        title: "Create a new Item",
                        brands: results.brands,
                        categories: results.categories,
                        item,
                        errors: errors.array(),
                    });
                }
            );
            return;
        }

        item.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect(item.url);
        });
    }
];

exports.item_update_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: item_update_get");
}

exports.item_update_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: item_update_post");
}

exports.item_delete_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: item_delete_get");
}

exports.item_delete_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: item_delete_post");
}