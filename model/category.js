const mongoose = require('mongoose');
const db = mongoose.connection;

//create schame
const categoryschema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    details: String,
    categoryid: String,
    img: String,
    views: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    brand:{ type: String, default: "" },
    color: { type: String, default: "" }
},
    {
        collection: 'category'
    });
categoryschema.index({'$**': 'text'});
const cate = db.useDb("mydb").model("cate", categoryschema);

module.exports = cate;