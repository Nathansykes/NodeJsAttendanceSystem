var mongoose = require("mongoose");
let Schema =  mongoose.Schema;
let Student = require('../models/student.model');
let AttendanceRecord = require('../models/attendanceRecord.model');

let sessionSchema = new Schema(
    {
        Title : String,
        Students : [{ type : mongoose.Schema.Types.ObjectId, ref : Student.modelName, "default" : [] }],
        AttendanceRecords : [{ type : mongoose.Schema.Types.ObjectId, ref : AttendanceRecord.modelName, "default" : [] }],
        Location: String,
        DateAndTime: Date
    });

module.exports = sessionSchema;