var mongoose = require("mongoose");
var tutorSchema = require("../schemas/tutor.schema")

module.exports = User.discriminator('Tutor', tutorSchema);