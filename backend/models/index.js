const myArgs = process.argv;
const connectionIndex = myArgs.indexOf('--connection');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

// index.Of will return -1 by default if no index is found
if (connectionIndex > -1) 
{
    const connectionString = myArgs[connectionIndex + 1];
    if (connectionString) 
    {
        db.url = connectionString;
    }
}
else 
{
    db.url = process.env.CONNECTION_STRING;
}

db.users = require("./user.model.js")(mongoose);
 
module.exports = db;