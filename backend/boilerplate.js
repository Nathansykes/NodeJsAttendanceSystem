
var mongoose = require('mongoose');
const Attendance = require("./models/attendanceRecord.model");
const User = require("./models/user.model");
const Student = require("./models/student.model");
const AcademicAdvisor = require("./models/advisor.model");
const CourseLeader = require("./models/courseLeader.model");
const Session = require("./models/session.model");
const Module = require("./models/module.model");
const Course = require("./models/course.model");

exports.runNathan = async function () {
    var studentId = (await Student.find())[0].id;
    var sessionId = (await Session.find())[0].id;
    var moduleId = (await Module.find())[1].id;
    var courseId = (await Course.find())[1].id;

    var student = await Student.findOne({ _id: studentId });

    

}
