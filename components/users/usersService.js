const UserModel = require('../../model/users');


module.exports.LoadUsers = async () => {

    const list = await UserModel.find();

    return list;
}

module.exports.getById = async (id) => {
    const result = await UserModel.findById(id);
    console.log(result + "ne")
    return result;
}
module.exports.lockUser = async (res, userid,band) => {
    const result = await UserModel.updateOne({ '_id': userid }, { $set: { 'band': band } }, (err, doc) => {
        if (err) {
            console.log("update document error");
        } else {
            console.log("update document success");
            console.log(doc);
        }
    });
    //return result.save();
}
module.exports.deleteUser = async(res, userid) => {
    const result = await UserModel.findOneAndRemove({ _id: userid },  (err, doc) => {
        if (err) {
            console.log("delete faild");
        } else {
            console.log("delete success");
            console.log(doc);
        }
    });
    //return result.save();

}