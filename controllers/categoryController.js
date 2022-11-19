const Category = require('../models/category');
const Item = require('../models/item');
const async = require('async');
const mongoose = require('mongoose');

exports.category_list = (req, res, next) => {
    Category.find({})
        .sort({ name: 1})
        .exec(function(err, categories) {
            if (err) {
                return next(err);
            }
            res.render('./category/category_list', {
                categories: categories,
            });
        });
}

exports.category_detail = (req, res, next) => {
    const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValid) {
        const err = new Error("Category not found");
        err.status = 404;
        return next(err);
    }
 
    async.parallel(
        {
            category(cb) {
                Category.findById(req.params.id).exec(cb);
            },
            category_items(cb) {
                Item.find({ category: req.params.id })
                    .populate("brand")
                    .exec(cb)
            },
        },
        function(err, results) {
            if (err) {
                return next(err);
            }
            res.render("./category/category_detail", {
                category: results.category,
                category_items: results.category_items,
            });
        }
    );
}

exports.category_create_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: category_create_get");
}

exports.category_create_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: category_create_post");
}

exports.category_update_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: category_update_get");
}

exports.category_update_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: category_update_post");
}

exports.category_delete_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: category_delete_get");
}

exports.category_delete_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: category_delete_post");
}