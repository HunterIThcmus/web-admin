const bcrypt = require('bcryptjs');
const UserModel = require('../../model/users');
module.exports.createUser = (name, email,password,permission) => {
    let hash = bcrypt.hashSync(password,bcrypt.genSaltSync(10));
    const newUser = new UserModel({name,email,password: hash,permission});
    console.log(newUser);
    return newUser.save();
}

module.exports.loginUser =(email,password) =>
{
    console.log("just for test");
    return true;
}