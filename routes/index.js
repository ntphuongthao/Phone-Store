var express = require('express');
var router = express.Router();

const item_controller = require('../controllers/itemController');
const brand_controller = require('../controllers/brandController');
const category_controller = require('../controllers/categoryController');

/// ITEMS ROUTES ///

router.get('/', item_controller.index);
router.get('/items/create', item_controller.item_create_get);
router.get('/items/create', item_controller.item_create_post);
router.get('/items/:id/delete', item_controller.item_delete_get);
router.get('/items/:id/delete', item_controller.item_delete_post);
router.get('/items/:id/update', item_controller.item_update_get);
router.get('/items/:id/update', item_controller.item_update_post);
router.get('/items/:id', item_controller.item_detail);
router.get('/items', item_controller.item_list);


/// BRAND ROUTES ///

router.get('/', item_controller.index);
router.get('/brands/create', brand_controller.brand_create_get);
router.get('/brands/create', brand_controller.brand_create_post);
router.get('/brands/:id/delete', brand_controller.brand_delete_get);
router.get('/brands/:id/delete', brand_controller.brand_delete_post);
router.get('/brands/:id/update', brand_controller.brand_update_get);
router.get('/brands/:id/update', brand_controller.brand_update_post);
router.get('/brands/:id', brand_controller.brand_detail);
router.get('/brands', brand_controller.brand_list);

/// CATEGORY ROUTES ///

router.get('/', item_controller.index);
router.get('/categories/create', category_controller.category_create_get);
router.get('/categories/create', category_controller.category_create_post);
router.get('/categories/:id/delete', category_controller.category_delete_get);
router.get('/categories/:id/delete', category_controller.category_delete_post);
router.get('/categories/:id/update', category_controller.category_update_get);
router.get('/categories/:id/update', category_controller.category_update_post);
router.get('/categories/:id', category_controller.category_detail);
router.get('/categories', category_controller.category_list);

module.exports = router;
