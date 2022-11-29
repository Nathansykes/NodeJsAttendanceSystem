
const mongoose = require('mongoose');
const Attendance = require("../models/attendanceRecord.model");
const Module = require("../models/module.model");
const Course = require("../models/course.model");
const Student = require("../models/student.model");
const Auth = require('../authentication')
const UserTypes = require('../../shared/usertypes');
const GenericFunctions = require('../../shared/functions');
const ErrorHandler = require("../handlers/error.handler");

exports.GetAttendanceForStudent = async (req, res) => {
  var studentId = req.query.StudentId?.toString()?.padStart(24, '0');
  var moduleId = req.query.ModuleId;
  var courseId = req.query.CourseId;
  if (!studentId) {
    res.status(400).send("StudentId is required");
    return;
  }

  var applicationUser = Auth.getApplicationUser(req)
  if(applicationUser.UserTypeId == UserTypes.Student.Id){
    if(studentId != applicationUser.Id){
      res.status(403).send("Cannot get attendance for another student");
      return;
    }
  }

  var student = await Student.findOne({ _id: studentId });
  var studentNameAndId = `${parseInt(studentId)} - ${student.FirstName} ${student.LastName}`;

  var records = [];
  var reportType;

  if (moduleId) {
    var module = await (Module.findOne({ _id: moduleId }).populate({
      path: 'Sessions',
      populate: {
        path: 'AttendanceRecords',
        model: 'AttendanceRecord',
        match: { Student: studentId }
      }
    }));

    reportType = `Attendance for Student: ${studentNameAndId} across all sessions in Module: ${module.Title}`;

    module.Sessions.forEach(s => {
      s.AttendanceRecords.forEach(a => {
        records.push({
          Session: s.Title,
          Date: new Date(s.DateAndTime).toLocaleDateString(),
          Attendance: GenericFunctions.GetAttendanceTypeById(a.Attendance).Name,
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
    reportType = `Attendance for Student: ${studentNameAndId} across all modules in Course: ${course.Title}`;

    course.Modules.forEach(m => {
      m.Sessions.forEach(s => {
        if (s.populated('AttendanceRecords')) {
          s.AttendanceRecords.forEach(a => {
            records.push({
              Module: m.Title,
              Session: s.Title,
              Date: new Date(s.DateAndTime).toLocaleDateString(),
              AttendanceMark: GenericFunctions.GetAttendanceTypeById(a.Attendance).Name
            });
          });
        }
      });
    });
  }
  else {

    var courses= await (Course.find().populate({
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

    console.log(courses);
    courses.forEach(c => {
      c.Modules.forEach(m => {
        m.Sessions.forEach(s => {
          if (s.AttendanceRecords.length > 0) {
            s.AttendanceRecords.forEach(a => {
              console.log(s.DateAndTime);
              records.push({
                Course: c.Title,
                Module: m.Title,
                Session: s.Title,
                Date: new Date(s.DateAndTime).toLocaleDateString(),
                AttendanceMark: GenericFunctions.GetAttendanceTypeById(a.Attendance).Name
              });
            });
          }
        });
      });
    });
    reportType = `All attendance for Student: ${studentNameAndId}`;
  }

  var returnObject = {
    ReportType: reportType,
    Records: records
  }
  console.log(returnObject);

  res.json(JSON.stringify(returnObject));  
}

exports.GetAttendanceForModule = async (req, res) => {
  var moduleId = req.query.ModuleId;
  if (!moduleId) {
    res.status(400).send("ModuleId is required");
    return;
  }

  var records = [];
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
        StudentID: parseInt(a.Student._id),
        Session: s.Title,
        Date: new Date(s.DateAndTime).toLocaleDateString(),
        Attendance: GenericFunctions.GetAttendanceTypeById(a.Attendance).Name,
      });
    });
  });

  var returnObject = {
    ReportType: reportType,
    Records: records
  }

  res.json(JSON.stringify(returnObject));
  
}

exports.GetAttendanceForCourse = async (req, res) => {
  var courseId = req.query.CourseId;
  if (!courseId) {
    res.status(400).send("CourseId is required");
    return;
  }

  var records =[];
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
          StudentID: parseInt(a.Student._id),
          Module: m.Title,
          Session: s.Title,
          Date: new Date(s.DateAndTime).toLocaleDateString(),
          AttendanceMark: GenericFunctions.GetAttendanceTypeById(a.Attendance).Name,
        });
      });
    });
  });

  var returnObject = {
    ReportType: reportType,
    Records: records
  }

  
  res.json(JSON.stringify(returnObject));
  
}

exports.DownloadReport = (req, res) => {
  
  try {
    var report = req.body.Report;
    const csv = convertRecordsToCSV(report.Records);
    res.json(JSON.stringify(csv));
  }
  catch(error) {
    ErrorHandler.handleError(res, error);
  }
}

function convertRecordsToCSV(records) {

  return [
    [
      Object.keys(records[0]),
    ],
    records.map(record => ["\n" +
      Object.values(record),
    ])
  ]
  .map(e => e.join(","));
}