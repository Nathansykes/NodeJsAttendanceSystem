var mongoose = require("mongoose");
var schema = require("../schemas/attendanceRecord.schema")

module.exports = mongoose.model('AttendanceRecord', schema);