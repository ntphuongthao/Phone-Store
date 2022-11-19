const Item = require('../models/item');
const Brand = require('../models/brand');
const Category = require('../models/category');
const async = require('async');
const mongoose = require('mongoose');

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
    res.send("NOT IMPLEMENTED: item_create_get");
}

exports.item_create_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: item_create_post");
}

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