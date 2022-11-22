
var mongoose = require('mongoose');
let Attendance = require("../models/attendanceRecord.model");

exports.GetAttendanceForStudent = ( req, res) => {
  var studentId = req.query.StudentId;
  var moduleId = req.query.ModuleId;
  var courseId = req.query.CourseId;
  var records;
  if((!moduleId) && (!courseId)){
    //get all attendance records for student
        Attendance.find({ Student: studentId }).then(data => {
          records = data;
          res.json(JSON.stringify(records));
        });
  }
  else if((moduleId) && (!courseId)) {
    //get all attendance records for student in module
  }
  else if(courseId) {
    //get all attendance records for student in course
  }
  else {
    //error
  }

  

}