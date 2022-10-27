var mongoose = require("mongoose");
let Schema =  mongoose.Schema;

let userSchema = new Schema(
    {
        Id: String,
        AccessLevel: Number,
        FirstName: String,
        LastName: String,
    },
    {
        discriminatorKey: "userType",
    });

module.exports = userSchema;