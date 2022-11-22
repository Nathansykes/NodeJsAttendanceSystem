const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.CONNECTION_STRING;

db.users = require("./user.model.js")(mongoose);
 
module.exports = db;