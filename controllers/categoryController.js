const Category = require('../models/category');
const Item = require('../models/item');
const async = require('async');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

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
    res.render("./category/category_form", {
        title: "Create a new Category",
    });
}

exports.category_create_post = [
    body("name")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Name must be specified"),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render("./category/category_form", {
                errors: errors.array(),
                title: "Create a new Category",
                category: req.body,
            });
        }

        const category = new Category({
            name: req.body.name
        });

        category.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect(err.url);
        });
    }
];

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