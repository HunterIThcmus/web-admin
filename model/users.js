const mongoose = require('mongoose');
const db = mongoose.connection;

//create schame
const useraccoutschema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    phone_number: String,
    sex: Boolean,
    address: String,
    band:Boolean
    },
    {
        collection: 'useraccout'
    });

const user = db.useDb("mydb").model("user", useraccoutschema);

module.exports = user;