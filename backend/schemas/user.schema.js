var mongoose = require("mongoose");
let Schema =  mongoose.Schema;
let options = require('./user.schema.options');

let userSchema = new Schema(
    {
        AccessLevel: Number,
        FirstName: String,
        LastName: String,
    }, options);

module.exports = userSchema;