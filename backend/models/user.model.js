var mongoose = require("mongoose");
var userSchema = require("../schemas/user.schema")

module.exports = mongoose.model('User', userSchema);