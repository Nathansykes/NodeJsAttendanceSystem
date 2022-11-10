var mongoose = require("mongoose");
let advisorSchema = require("../schemas/advisor.schema")
const User = require("./user.model");

module.exports = User.discriminator('Advisor', advisorSchema);