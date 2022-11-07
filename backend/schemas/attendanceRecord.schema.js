var mongoose = require("mongoose");
let Schema = mongoose.Schema;
const Student = require("../models/student.model");

let attendanceSchema = new Schema(
    {
        SessionID: {type : mongoose.Schema.Types.ObjectId, ref : "Session"},
        Student: {type : mongoose.Schema.Types.ObjectId, ref : Student.modelName},
        Attendance: Boolean,
        Late: Boolean,
    });

module.exports = attendanceSchema;