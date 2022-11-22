
var mongoose = require('mongoose');
const Attendance = require("../models/attendanceRecord.model");
const Module = require("../models/module.model");
const Course = require("../models/course.model");
const Student = require("../models/student.model");

exports.GetAttendanceForStudent = async (req, res) => {
  var studentId = req.query.StudentId?.padLeft(24, '0');
  var moduleId = req.query.ModuleId;
  var courseId = req.query.CourseId;
  if (!studentId) {
    res.status(400).send("StudentId is required");
    return;
  }
  var student = await Student.findOne({ _id: studentId });

  var records;
  var reportType;

  if ((moduleId) && (!courseId)) {
    var module = await (Module.findOne({ _id: moduleId }).populate({
      path: 'Sessions',
      populate: {
        path: 'AttendanceRecords',
        model: 'AttendanceRecord',
        match: { Student: studentId }
      }
    }));
    reportType = "Attendance for student across all sessions in module: " + module.Name;

    module.Sessions.forEach(s => {
      s.AttendanceRecords.forEach(a => {
        records.push({
          Session: s.Title,
          Date: s.DateAndTime,
          Attendance: a.Attendance,
          Late: a.Late
        });
      });
    })
  }
  else if (courseId) {
    var course = await (Course.findOne({ _id: courseId }).populate({
      path: 'Modules',
      populate: {
        path: 'Sessions',
        populate: {
          path: 'AttendanceRecords',
          model: 'AttendanceRecord',
          match: { Student: studentId }
        }
      }
    }));
    reportType = "Attendance for student across all modules in course: " + course.Title;

    course.Modules.forEach(m => {
      m.Sessions.forEach(s => {
        if (s.populated('AttendanceRecords')) {
          s.AttendanceRecords.forEach(a => {
            records.push({
              Module: m.Title,
              Session: s.Title,
              Date: s.DateAndTime,
              Attendance: a.Attendance,
              Late: a.Late
            });
          });
        }
      });
    });
  }

  var returnObject = {
    StudentName: student.FirstName + ' ' + student.LastName,
    StudentId: studentId,
    ReportType: reportType,
    Records: records
  }

  if (records.length > 0) {
    res.json(JSON.stringify(returnObject));
  }
}

exports.GetAttendanceForModule = async (req, res) => {
  var moduleId = req.query.ModuleId;
  if (!moduleId) {
    res.status(400).send("ModuleId is required");
    return;
  }

  var records;
  var reportType;

  var module = await (Module.findOne({ _id: moduleId }).populate({
    path: 'Sessions',
    populate: {
      path: 'AttendanceRecords',
      model: 'AttendanceRecord',
      populate: {
        path: 'Student',
        model: 'Student'
      }
    }
  }));

  reportType = "Attendance for all students across all sessions in module: " + module.Title;

  module.Sessions.forEach(s => {
    s.AttendanceRecords.forEach(a => {
      records.push({
        StudentName: a.Student.FirstName + ' ' + a.Student.LastName,
        StudentID: a.Student._id,
        Session: s.Title,
        Date: s.DateAndTime,
        Attendance: a.Attendance,
        Late: a.Late
      });
    });
  });

  var returnObject = {
    ReportType: reportType,
    Records: records
  }

  if (records.length > 0) {
    res.json(JSON.stringify(returnObject));
  }
}

exports.GetAttendanceForCourse = async (req, res) => {
  var courseId = req.query.CourseId;
  if (!courseId) {
    res.status(400).send("CourseId is required");
    return;
  }

  var records;
  var reportType;

  var course = await (Course.findOne({ _id: courseId }).populate({
    path: 'Modules',
    populate: {
      path: 'Sessions',
      populate: {
        path: 'AttendanceRecords',
        model: 'AttendanceRecord',
        populate: {
          path: 'Student',
          model: 'Student'
        }
      }
    }
  }));

  reportType = "Attendance for all students across all modules in course: " + course.Title;

  course.Modules.forEach(m => {
    m.Sessions.forEach(s => {
      s.AttendanceRecords.forEach(a => {
        records.push({
          StudentName: a.Student.FirstName + ' ' + a.Student.LastName,
          StudentID: a.Student._id,
          Module: m.Title,
          Session: s.Title,
          Date: s.DateAndTime,
          Attendance: a.Attendance,
          Late: a.Late
        });
      });
    });
  });

  var returnObject = {
    ReportType: reportType,
    Records: records
  }

  if (records.length > 0) {
    res.json(JSON.stringify(returnObject));
  }
}
