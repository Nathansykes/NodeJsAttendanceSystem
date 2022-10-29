var mongoose = require("mongoose");
let studentSchema = require("../schemas/student.schema")
const User = require("./user.model");

module.exports = User.discriminator('Student', studentSchema);