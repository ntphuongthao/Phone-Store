const Brand = require('../models/brand');
const Item = require('../models/item');
const async = require('async');
const mongoose = require('mongoose');

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
    res.send("NOT IMPLEMENTED: brand_create_get");
}

exports.brand_create_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: brand_create_post");
}

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