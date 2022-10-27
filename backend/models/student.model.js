var mongoose = require("mongoose");
let studentSchema = require("../schemas/user.schema")

module.exports = mongoose.model('Student', studentSchema);