var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/top10', function(req, res, next) {
  res.render('top10', { title: 'Express' });
});

router.get('/manage_users_account', function(req, res, next) {
  res.render('manage_users_account', { title: 'Express' });
});

router.get('/edit_user_profile', function(req, res, next) {
  res.render('edit_user_profile', { title: 'Express' });
});

router.get('/orders', function(req, res, next) {
  res.render('orders', { title: 'Express' });
});
router.get('/sales', function(req, res, next) {
  res.render('sales', { title: 'Express' });
});

router.get('/products', function(req, res, next) {
  res.render('products', { title: 'Express' });
});

router.get('/addproduct', function(req, res, next) {
  res.render('addproduct', { title: 'Express' });
});
module.exports = router;
