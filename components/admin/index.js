var express = require('express');
var router = express.Router();

// const passport = require('../../passport');
const userController = require('./adminController');

router.get('/login', function (req, res, next) {
    const errors=req.flash().error || [];
    res.render('login', { title: 'Login',errors });
});


router.get('/register', function (req, res, next) {
    const errors = req.flash().error || [];
    res.render('register', { title: 'Register',errors });
});

router.post('/register', userController.createUser);


router.post('/login',userController.loginUser);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;