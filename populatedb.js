#! /usr/bin/env node

console.log('This script populates some test items, brands and categories to your database.');
// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Item = require('./models/item')
var Brand = require('./models/brand')
var Category = require('./models/category')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var items = []
var brands = []
var categories = []

function ItemCreate(name, brand, category, price, description, numberInStock, cb) {
  itemdetail = {
    name: name,
    brand: brand,
    category: category, 
    price: price,
    description: description,
    numberInStock: numberInStock,
  };
  
  var item = new Item(itemdetail);
       
  item.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New item: ' + item);
    items.push(item)
    cb(null, item)
  });
}

function BrandCreate(name, cb) {
  var brand = new Brand({ name: name });
       
  brand.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Brand: ' + brand);
    brands.push(brand)
    cb(null, brand);
  });
}

function CategoryCreate(name, cb) {
  categorydetail = { 
    name: name
  }
    
  var category = new Category(categorydetail);    
  category.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New category: ' + category);
    categories.push(category)
    cb(null, category)
  });
}


function createBrands(cb) {
    async.parallel([
        function(callback) {
          BrandCreate("Apple", callback);
        },
        function(callback) {
          BrandCreate("Samsung", callback);
        },
        function(callback) {
          BrandCreate("Oppo", callback);
        },
        function(callback) {
          BrandCreate("Sony", callback);
        },
        function(callback) {
          BrandCreate("Xiaomi", callback);
        },
      ],
      // optional callback
      cb);
}


function createCategories(cb) {
    async.parallel([
        function(callback) {
          CategoryCreate("Phone", callback);
        },
        function(callback) {
          CategoryCreate("Tablet", callback);
        },
        function(callback) {
          CategoryCreate("Headphone", callback);
        },
        function(callback) {
          CategoryCreate("Laptop", callback);
        },
      ],
      // optional callback
      cb);
}


function createItems(cb) {
    async.parallel([
        // name, brand, category, price, description, numberInStock
        function(callback) {
          ItemCreate("Iphone 13", brands[0], [categories[0]], 999, 'Available', 100, callback)
        },
        function(callback) {
          ItemCreate("Iphone 14", brands[0], [categories[0]], 1299, 'Available', 200, callback)
        },
        function(callback) {
          ItemCreate("Iphone 12", brands[0], [categories[0]], 799, 'Available', 50, callback)
        },
        function(callback) {
          ItemCreate("Samsung Galazy Z-Flip4", brands[1], [categories[0]], 899, 'Available', 100, callback)
        },
        function(callback) {
          ItemCreate("Oppo Reno Dual-Sim", brands[2], [categories[0]], 699, 'Available', 300, callback)
        },
        function(callback) {
          ItemCreate("Sony Xperia PRO 5G", brands[3], [categories[0]], 1099, 'Available', 199, callback)
        },
        function(callback) {
          ItemCreate("Xiaomi Redmi", brands[4], [categories[0]], 899, 'Available', 120, callback)
        },
        function(callback) {
          ItemCreate("Macbook Pro 2022", brands[0], [categories[3]], 1899, 'Available', 500, callback)
        },
        function(callback) {
          ItemCreate("Macbook Air 2021", brands[0], [categories[3]], 1199, 'Available', 100, callback)
        },
        function(callback) {
          ItemCreate("Airpods Pro", brands[0], [categories[2]], 179, 'Available', 100, callback)
        },
        ],
        // Optional callback
        cb);
}



async.series([
    createBrands,
    createCategories,
    createItems
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+ err);
    }
    else {
        console.log('Items: ' + items);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



