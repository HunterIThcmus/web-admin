const ProductModel = require('../../model/category');

module.exports.getAll= async () =>{
    const result =await ProductModel.find({});
    console.log(result);
    return result;
}

module.exports.addProduct =  (res,name,price,category,img,detail) =>{
    var newproduct;
    try {   
    newproduct = new ProductModel({name,price,category,detail,categoryid:"1",img});
        
    } catch (error) {
        console.log(error)
        throw(error)
    }
    console.log(newproduct);
    return newproduct.save();
}

