const ProductModel = require('../../model/category');
const OrderModel = require('../../model/sold');

module.exports.getAll= async () =>{
    const result =await ProductModel.find({});
    return result;
}

module.exports.getCate = async (id) => {
    const result = await ProductModel.find({ 'categoryid': id });
    return result;
}

module.exports.getAllQuery = async (s, l, sk, search) => {
    let result=null;
    if(search){
        // let a="\"";
        // const t=search.replace('+',' ');
        // a=a.concat(t,"\"");
        result = await ProductModel.find({$text:{$search: search}},
            null,
            {
                skip: sk,
                limit: l,
                sort: {
                    price: s
                }
            });
    }else{
        result = await ProductModel.find({},
            null,
            {
                skip: sk,
                limit: l,
                sort: {
                    price: s
                }
            });
    }
    
    return result;
}

module.exports.getCateQuery = async (id, s, l, sk, search) => {
    let result=null;
    console.log(search)
    if(search)
    {
        // let a="\"";
        // const t=search.replace('+',' ');
        // a=a.concat(t,"\"");
        // console.log("có search")
        result = await ProductModel.find({ 'categoryid': id,$text:{$search: search}},
            null,
            {
                skip: sk,
                limit: l,
                sort: {
                    price: s
                },
                
            });
    }else{
        console.log("không search")
        result = await ProductModel.find({ 'categoryid': id},
            null,
            {
                skip: sk,
                limit: l,
                sort: {
                    price: s
                },
                
            });
    }
    console.log(result)
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

module.exports.getAllOrder = async () => {
    const result = await OrderModel.find({});
    return result;
}

module.exports.getOrderById = async (id) => {
    const result = await OrderModel.findById({'_id': id});
    return result;
}

module.exports.editOrder = async (res, id, newinfo) => {
    const result = await OrderModel.updateOne({ '_id': id }, { $set: { 'phone': newinfo.phone, 'add1': newinfo.add1, 'status': newinfo.status } }, (err, doc) => {
        if (err) {
            console.log("update document error");
        } else {
            console.log("update document success");
            console.log(doc);
        }
    });
    return result.save();
}

module.exports.deleteOrderById = async (id) => {
    await OrderModel.findOneAndDelete({'_id': id});
}

module.exports.getTop10 = async () => {
    const result = await ProductModel.find({},null,
        {
            skip: 0,
            limit: 10,
            sort: {
                sold: -1
            }
        });
        console.log(result)
        return result;
}
