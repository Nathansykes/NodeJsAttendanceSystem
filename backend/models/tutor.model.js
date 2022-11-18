var mongoose = require("mongoose");
var tutorSchema = require("../schemas/tutor.schema");
const User = require("./user.model");

module.exports = User.discriminator('Tutor', tutorSchema);