const ProductModel = require('../../model/category');

module.exports.getAll= async () =>{
    const result =await ProductModel.find({});
    console.log(result);
    return result;
    
}

