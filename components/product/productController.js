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