var mongoose = require("mongoose");
var courseSchema = require("../schemas/course.schema");

module.exports = mongoose.model('Course', courseSchema);