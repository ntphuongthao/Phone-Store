const Brand = require('../models/brand');
const Item = require('../models/item');
const async = require('async');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

exports.brand_list = (req, res, next) => {
    Brand.find({})
        .sort({ name: 1})
        .exec(function(err, brands) {
            if (err) {
                return next(err);
            }
            res.render('./brand/brand_list', {
                brands: brands,
            })
        });
}

exports.brand_detail = (req, res, next) => {
    const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValid) {
        const err = new Error("Brand not found");
        err.status = 404;
        return next(err);
    }

    async.parallel(
        {
            brand(callback) {
                Brand.findById(req.params.id).exec(callback);
            },
            brand_items(callback) {
                Item.find({ brand: req.params.id })
                    .populate("brand")
                    .populate("category")
                    .exec(callback);
            }
        },
        function(err, results) {
            if (err) {
                return next(err);
            }
            res.render("./brand/brand_detail", {
                brand: results.brand,
                brand_items: results.brand_items,
            });
        }
    );
}

exports.brand_create_get = (req, res, next) => {
    res.render("./brand/brand_form", {
        title: "Create a new Brand",
    });
}

exports.brand_create_post = [
    body("name")
        .trim()
        .isLength({ min: 1})
        .withMessage("Name should be specified"),
    body("image")
        .trim()
        .isLength({ min: 1 }),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render("./brand/brand_form", {
                title: "Create a new Brand",
                errors: errors.array(),
                brand: req.body,
            })
        }

        const brand = new Brand({
            name: req.body.name,
            image: req.body.image
        });

        brand.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect(brand.url);
        })
    }
]

exports.brand_update_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: brand_update_get");
}

exports.brand_update_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: brand_update_post");
}

exports.brand_delete_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: brand_delete_get");
}

exports.brand_delete_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: brand_delete_post");
}