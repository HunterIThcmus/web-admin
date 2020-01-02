const productService = require('./productService');
const user = require('../../model/admin');

module.exports.Category = async (req,res,next) =>{
    let value
    try {
        value = await productService.getAll();
        
    } catch (error) {
        next(error);
        
    }
    if (value && value.length)
            res.render('products', { title: value[0].category, list: value, user: req.user}) 
        else
            res.render('products', { list: value, user: req.user})       
}

module.exports.AddProduct =  async (req,res,next)=>{
    await productService.addProduct(res,req.body.productname,req.body.price,req.category,req.body.urlimage,"123");
    console.log(req.body.productname+" + "+ req.body.category +"  +  " +req.body.urlimage);
    // Category()
    // res.render('products',{title:"products"});
    this.Category(req,res,next);

}