const mongoose = require('mongoose');
var db = mongoose.connection;
// console.log("trang thai la"+ db.readyState);
//create schame
var useraccountschema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    permission: Boolean
},
    {
        collection: 'adminaccounts'

    });

const user = db.useDb("webadmin").model("user", useraccountschema);

module.exports = user;