var express = require('express');
var router = express.Router();
const productController = require('./productController');


router.get('/products', productController.Category);

router.post('/addproduct',productController.AddProduct);

router.get('/addproduct', function(req, res, next) {
  res.render('addproduct.hbs', { title: 'Express' });
});

module.exports = router;