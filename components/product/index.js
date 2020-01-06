var express = require('express');
var router = express.Router();
const productController = require('./productController');


router.get('/products', productController.Category);

router.post('/addproduct',productController.AddProduct);

router.get('/addproduct', function(req, res, next) {
  res.render('addproduct.hbs', { title: 'Express' });
});

router.get('/orders',productController.Order);

router.get('/edit_order',productController.infoOrder);

router.post('/edit_order',productController.editOrder);

router.get('/delete_order',productController.deleteOrder);

module.exports = router;