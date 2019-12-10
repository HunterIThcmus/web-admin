var express = require('express');
var router = express.Router();
const productController = require('./productController');


router.get('/products', productController.Category);
module.exports = router;