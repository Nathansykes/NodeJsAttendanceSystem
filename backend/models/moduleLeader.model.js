var mongoose = require("mongoose");
let moduleLeaderSchema = require("../schemas/moduleLeader.schema")
const User = require("./user.model");

module.exports = User.discriminator("Module Leader", moduleLeaderSchema);