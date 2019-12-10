const mongoose = require('mongoose');
const db = mongoose.connection;

//create schame
const useraccoutschema = new mongoose.Schema({
    name: String,
    username: String,
    password: String
    },
    {
        collection: 'useraccout'
    });

const user = db.useDb("mydb").model("user", useraccoutschema);

module.exports = user;