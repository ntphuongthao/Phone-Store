const Category = require('../models/category');
const async = require('async');

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
    res.send("NOT IMPLEMENTED: category_detail");
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