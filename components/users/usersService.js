const UserModel = require('../../model/users');


module.exports.LoadUsers = async() => {

   const list= await UserModel.find();
           
         return list;
        }
  
module.exports.getById = async (id) => {
    const result = await UserModel.findById(id);
    console.log(result + "ne")
    return result;
}
