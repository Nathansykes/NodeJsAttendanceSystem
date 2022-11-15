var mongoose = require("mongoose");
let sessionSchema = require("../schemas/session.schema");
const User = require("./session.model");

module.exports = mongoose.model('Session', sessionSchema);