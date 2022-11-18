const Brand = require('../models/brand');
const async = require('async');

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
    res.send("NOT IMPLEMENTED: brand_detail");
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