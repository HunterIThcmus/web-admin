const productService = require('./productService');
const user = require('../../model/admin');

module.exports.Category = async (req, res, next) => {
    let value
    try {
        value = await productService.getAll();

    } catch (error) {
        next(error);

    }
    if (value && value.length)
        res.render('products', { title: value[0].category, list: value, user: req.user })
    else
        res.render('products', { list: value, user: req.user })
}

module.exports.AddProduct = async (req, res, next) => {
    await productService.addProduct(res, req.body.productname, req.body.price, req.category, req.body.urlimage, "123");
    console.log(req.body.productname + " + " + req.body.category + "  +  " + req.body.urlimage);
    // Category()
    // res.render('products',{title:"products"});
    this.Category(req, res, next);
}

module.exports.Order = async (req, res, next) => {
    let value
    try {
        value = await productService.getAllOrder();
    } catch (error) {
        next(error);

    }
    if (value && value.length)
        res.render('orders', { title: 'Đơn hàng', list: value })
    else
        res.render('orders', { list: 'Đơn hàng' })
}

module.exports.infoOrder = async (req, res, next) => {
    let order;
    try {
        order = await productService.getOrderById(req.query.id);
    } catch (error) {
        next(error);
    }
    res.render('edit_order', { title: 'Thông tin đơn hàng', order: order });
}

module.exports.editOrder = async (req, res, next) =>{
    const newinfo = {'phone': req.body.phone, 'add1': req.body.addr1,'status': req.body.stt};
    try {
        await productService.editOrder(res, req.query.id, newinfo);
    } catch (error) {
        next(error);
    }
    res.redirect('back');
}

module.exports.deleteOrder = async (req, res, next) => {
    try {
        await productService.deleteOrderById(req.query.id);
        res.redirect('/orders');
    } catch (error) {
        next(error);
    }
    
}