const UserService = require('./adminService');
const passport = require('passport');
require('../../passport')(passport);
module.exports.createUser = async (req, res, next) => {
    try{
        await UserService.createUser(res,req.body.name,req.body.email,req.body.password);
    }catch(e){
        next(e);
    }
    
}

module.exports.loginUser= async (req,res,next) => {

//create super andmin if it not exists
   await UserService.CreateSuperUser();

  try {
    //await UserService.loginUser(req.body.username,req.body.password);
    console.log("login appear");

    await passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
      })(req, res, next);
} catch (error) {
    console.log("login error");
    next(error);
}
 
}