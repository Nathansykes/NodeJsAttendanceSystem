const myArgs = process.argv;

const connectionIndex = myArgs.indexOf('--connection');
const connectionString = myArgs[connectionIndex + 1];

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

if (connectionString) 
{
    db.url = connectionString;
}
else 
{
    const dbConfig = require("../config/db.config.js");
    db.url = dbConfig.url;
}

db.users = require("./user.model.js")(mongoose);
 
module.exports = db;