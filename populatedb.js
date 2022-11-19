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

function ItemCreate(name, brand, category, price, description, numberInStock, image, cb) {
  itemdetail = {
    name: name,
    brand: brand,
    category: category, 
    price: price,
    description: description,
    numberInStock: numberInStock,
    image: image,
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

function BrandCreate(name, image, cb) {
  var brand = new Brand({
    name: name,
    image: image,
  });
       
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
    name: name,
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
          BrandCreate("Apple", "https://static01.nyt.com/images/2022/03/08/business/00apple-trademarks-logos10/00apple-trademarks-logos10-mobileMasterAt3x-v6.jpg", callback);
        },
        function(callback) {
          BrandCreate("Samsung", "https://vectorseek.com/wp-content/uploads/2021/01/Samsung-Logo-Vector-scaled.jpg", callback);
        },
        function(callback) {
          BrandCreate("Oppo", "https://upload.wikimedia.org/wikipedia/commons/1/1c/OPPO_LOGO.jpg", callback);
        },
        function(callback) {
          BrandCreate("Sony", "https://1000logos.net/wp-content/uploads/2017/06/Symbol-Sony.jpg", callback);
        },
        function(callback) {
          BrandCreate("Xiaomi", "https://imgsrv2.voi.id/pmfEGnbJmwmh0L4Uk3x5yplPZYlJIT154ozhZr-1VHs/auto/970/544/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy80MTgxNS8yMDIxMDMzMTE1MjctbWFpbi5qcGc.jpg", callback);
        },
      ],
      // optional callback
      cb);
}


function createCategories(cb) {
    async.series([
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
          ItemCreate("Iphone 13", brands[0], [categories[0]], 999, 'Available', 100, "https://media.wired.com/photos/6148ef98a680b1f2086efee0/1:1/w_1037,h_1037,c_limit/Gear-Review-Apple_iphone13_hero_us_09142021.jpg", callback)
        },
        function(callback) {
          ItemCreate("Iphone 14", brands[0], [categories[0]], 1299, 'Available', 200, "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6487/6487386_sd.jpg", callback)
        },
        function(callback) {
          ItemCreate("Iphone 12", brands[0], [categories[0]], 799, 'Available', 50, "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-12-purple-2021?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1635202738000", callback)
        },
        function(callback) {
          ItemCreate("Samsung Galazy Z-Flip4", brands[1], [categories[0]], 899, 'Available', 100, "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6512/6512618_sd.jpg", callback)
        },
        function(callback) {
          ItemCreate("Oppo Reno Dual-Sim", brands[2], [categories[0]], 699, 'Available', 300, "https://m.media-amazon.com/images/I/71UUOLw6lwL.jpg", callback)
        },
        function(callback) {
          ItemCreate("Sony Xperia PRO 5G", brands[3], [categories[0]], 1099, 'Available', 199, "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6489/6489669_sd.jpg", callback)
        },
        function(callback) {
          ItemCreate("Xiaomi Redmi Note 10 PRO", brands[4], [categories[0]], 899, 'Available', 120, "https://m.media-amazon.com/images/I/51UyTHwP6wL.jpg", callback)
        },
        function(callback) {
          ItemCreate("Macbook Pro 2022", brands[0], [categories[3]], 1899, 'Available', 500, "https://www.nehruplacedealers.com/wp-content/uploads/2022/04/mbp14-spacegray-select-202110.jpeg", callback)
        },
        function(callback) {
          ItemCreate("Macbook Air 2021", brands[0], [categories[3]], 1199, 'Available', 100, "https://www.pcrichard.com/dw/image/v2/BFXM_PRD/on/demandware.static/-/Sites-pcrichard-master-product-catalog/default/dw5ab4f8a5/images/hires/AZ1_MLY43LL-A.jpg?sw=800&sh=800&sm=fit", callback)
        },
        function(callback) {
          ItemCreate("Airpods Pro", brands[0], [categories[2]], 179, 'Available', 100, "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361", callback)
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



