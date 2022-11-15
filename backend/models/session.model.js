var mongoose = require("mongoose");
let sessionSchema = require("../schemas/session.schema");

module.exports = mongoose.model('Session', sessionSchema);