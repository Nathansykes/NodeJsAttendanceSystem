var mongoose = require("mongoose");
let Schema =  mongoose.Schema;
let options = require('./user.schema.options');

let userSchema = new Schema(
    {
        FirstName: String,
        LastName: String,
        Password: String,
    }, options);

module.exports = userSchema;