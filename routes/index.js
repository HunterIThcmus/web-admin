var express = require('express');
var router = express.Router();
const adminService = require('../components/admin/adminService');

/* GET home page. */
router.get('/', function(req, res, next) {
  adminService.CreateSuperUser();
  if(req.user){
  res.render('index', { title: 'Shop admin',user: req.user });
  }
  else{
    res.redirect('login');
  }
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express',user: req.user });
});


router.get('/sales', function(req, res, next) {
  res.render('sales', { title: 'Express' });
});

module.exports = router;
