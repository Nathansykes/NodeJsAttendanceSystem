var mongoose = require("mongoose");
var moduleSchema = require("../schemas/module.schema")

module.exports = mongoose.model('Module', moduleSchema);