const mongoose = require('mongoose');
const db = mongoose.connection;

//create schame
const categoryschema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    details: String,
    categoryid: String,
    img: String
    },
    {
        collection: 'category'
    });

const cate = db.useDb("mydb").model("cate", categoryschema);

module.exports = cate;