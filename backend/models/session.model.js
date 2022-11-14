var mongoose = require("mongoose");
var sessionSchema = require("../schemas/session.schema")

module.exports = mongoose.model('Session', sessionSchema);