const productService = require('./productService');
const user = require('../../model/admin');

module.exports.Category = async (req, res, next) => {
    let value;
    let total;
    if (typeof req.query.q === 'undefined') {
        let is1 = (req.query.sort == 1);
        let is_1 = (req.query.sort == -1);
        let is6 = (req.query.limit == 6);
        let is12 = (req.query.limit == 12);
        let is20 = (req.query.limit == 20);
        let is30 = (req.query.limit == 30);

        let search_q = "";
        let sort_criteria = 1;
        let limit_number = 6;
        let skip_index = 0;
        

        if (typeof req.query.sort != 'undefined') {
            sort_criteria = req.query.sort;
        }
        if (typeof req.query.limit != 'undefined') {
            limit_number = parseInt(req.query.limit);
        }
        if (typeof req.query.skip != 'undefined') {
            skip_index = parseInt(req.query.skip);
        }
        if (typeof req.query.search != 'undefined') {
            search_q = req.query.search;
        }

        try {
            total = await productService.getAll();
        } catch (error) {
            next(error);
        }
        if(typeof req.query.b!='undefined')
            {
                for(i=0;i<total.length;i++)
                {
                    if(!total[i].brand.includes(req.query.b))
                    {
                        total.splice(i,1);
                        i=i-1
                    }
                }
                search_q=search_q+" "+req.query.b
            }
        let array = [];
        for (let i = 0; i < Math.ceil(total.length / limit_number); i++) {
            array.push({ pagenum: i + 1 });
            if (i === (skip_index / limit_number)) {
                array[i].isActive = true;
            } else array[i].isActive = false;
        }

        if (skip_index > total.length) {
            skip_index = 0;
        }

        try {
            value = await productService.getAllQuery(sort_criteria, limit_number, skip_index, search_q);
        } catch (error) {
            next(error);
        }
        res.render('products', { title: 'products', list: value, array: array, lim: limit_number, is1: is1, is_1: is_1, is6: is6, is12: is12, is20: is20, is30: is30 })


    }
    else {
        let search_q = null;
        let sort_criteria = 1;
        let limit_number = 6;
        let skip_index = 0;
        let total;

        let is1 = (req.query.sort == 1);
        let is_1 = (req.query.sort == -1);
        let is6 = (req.query.limit == 6);
        let is12 = (req.query.limit == 12);
        let is20 = (req.query.limit == 20);
        let is30 = (req.query.limit == 30);

        if (typeof req.query.sort != 'undefined') {
            sort_criteria = req.query.sort;
        }
        if (typeof req.query.limit != 'undefined') {
            limit_number = parseInt(req.query.limit);
        }
        if (typeof req.query.skip != 'undefined') {
            skip_index = parseInt(req.query.skip);
        }
        if (typeof req.query.search != 'undefined') {
            search_q = req.query.search;
        }

        try {
            total = await productService.getCate(req.query.q);
        } catch (error) {
            next(error);
        }

        if(typeof req.query.b!='undefined')
            {
                for(i=0;i<total.length;i++)
                {
                    if(!total[i].brand.includes(req.query.b))
                    {
                        total.splice(i,1);
                        i=i-1
                    }
                }
            }
        if(typeof req.query.b!='undefined'){
            search_q=search_q+" "+req.query.b
        }
        let array = [];
        for (let i = 0; i < Math.ceil(total.length / limit_number); i++) {
            array.push({ pagenum: i + 1 });
            if (i === (skip_index / limit_number)) {
                array[i].isActive = true;
            } else array[i].isActive = false;
        }

        try {
            value = await productService.getCateQuery(req.query.q, sort_criteria, limit_number, skip_index, search_q);
        } catch (error) {
            next(error);
        }

        if (value && value.length)
            res.render('products', { title: value[0].category, list: value, array: array, lim: limit_number, is1: is1, is_1: is_1, is6: is6, is12: is12, is20: is20, is30: is30 })
        else
            res.render('products', { list: value, array: array, lim: limit_number, is1: is1, is_1: is_1, is6: is6, is12: is12, is20: is20, is30: is30 })
    }
}

module.exports.AddProduct = async (req, res, next) => {
    await productService.addProduct(res, req.body.productname, req.body.price, req.body.category, req.body.urlimage,req.body.color,req.body.details);
    console.log(req.body.productname + " + " + req.body.color + "  +  " + req.body.details);
    // Category()
    // res.render('products',{title:"products"});
    res.redirect('products');
}
module.exports.DeleteProduct =async(req,res,next) =>{
   await productService.deleteproduct(req.query.q);
   res.redirect('back');
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

module.exports.getTop10 = async (req, res, next) => {
    let value
    try {
        value = await productService.getTop10();
    } catch (error) {
        next(error);
    }
    res.render('top10', { title: 'Top 10', value: value });
}