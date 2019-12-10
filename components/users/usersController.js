const UserService = require('./usersService');

module.exports.LoadUsers = async (req, res, next) => {
    let list=[];
    try{
        list= await UserService.LoadUsers();
       
    }catch(e){
        next(e);
    }
   
    res.render("manage_users_account", { title: "ListUsers", list: list,user:req.user })
}

module.exports.EditUsersAccount=async (req, res, next) => {

    let value
    try {
        console.log(req.query.q)
        value = await UserService.getById(req.query.q)

    } catch (error) {
        next(error);
    }
    res.render('edit_user_profile', { value:value, user: req.user })
}
module.exports.Block= async(req,res,next) =>{
    
}