var express = require('express');
var router = express.Router();

// const passport = require('../../passport');
const userController = require('./usersController');

router.get('/login', function (req, res, next) {
    const errors=req.flash().error || [];
    res.render('login', { title: 'Login',errors });
});

router.get('/register', function (req, res, next) {
    res.render('register', { title: 'Register' });
});

router.post('/register', userController.createUser);


router.post('/login',userController.loginUser);

module.exports = router;