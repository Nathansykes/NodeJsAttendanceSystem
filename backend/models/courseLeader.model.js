let courseLeaderSchema = require("../schemas/courseLeader.schema")
const User = require("./user.model");

module.exports = User.discriminator('CourseLeader', courseLeaderSchema);