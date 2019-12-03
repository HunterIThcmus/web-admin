const UserService = require('./usersService');
const passport = require('passport');
require('../../passport')(passport);
module.exports.createUser = async (req, res, next) => {
    try{
        await UserService.createUser("test",req.body.email,req.body.password,"1");
        res.redirect('/');
    }catch(e){
        next(e);
    }
    
};

module.exports.loginUser= async (req,res,next) => {
try {
    //await UserService.loginUser(req.body.username,req.body.password);
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
      })(req, res, next);
} catch (error) {
    console.log("loi roi");
    next(error);
}
}