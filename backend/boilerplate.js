
var mongoose = require('mongoose');
const Attendance = require("./models/attendanceRecord.model");
const User = require("./models/user.model");
const Student = require("./models/student.model");
const AcademicAdvisor = require("./models/advisor.model");
const CourseLeader = require("./models/courseLeader.model");
const Session = require("./models/session.model");
const Module = require("./models/module.model");
const Course = require("./models/course.model");

exports.run = async function () {

    var studentId = (await Student.find())[0].id;
    var sessionId = (await Session.find())[0].id;
    var moduleId = (await Module.find())[1].id;
    var courseId = (await Course.find())[1].id;

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
        reportType = "Attendance for student across all sessions in module: " + module.Title;

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
                    model: 'AttendanceRecord'
                }
            }
        }));
        reportType = "Attendance for student across all modules in course: " + course.Title;

        console.log(course);

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
    
    console.log(returnObject);

}
