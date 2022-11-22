
var mongoose = require('mongoose');
const Attendance = require("./models/attendanceRecord.model");
const User = require("./models/user.model");
const Student = require("./models/student.model");
const AcademicAdvisor = require("./models/advisor.model");
const CourseLeader = require("./models/courseLeader.model");
const Session = require("./models/session.model");
const Module = require("./models/module.model");

exports.run = async function() {
    console.log("Running boilerplate");

    var student = (await Student.find())[2].id;
    var session = (await Session.find())[0].id;
    var moduleId = (await Module.find())[0].id;
    
    Module.findOne({ _id: moduleId }).populate('Sessions').then(data => {
        var sessionIds = data.Sessions.map(x => x._id);

        Attendance.find({ SessionID: { $in: sessionIds } }).populate('Student').then(data => {
            var result= data.map(x => ({ 
                Student: x.Student.FirstName + ' '+ x.Student.LastName, 
                Attendance: x.Attendance, 
                Late: x.Late 
            }));
            console.log(result);
        });
        
    });
    

    // attendance = new Attendance({
    //     SessionID: session,
    //     Student: student,
    //     Attendance: true,
    //     Late: false
    // });
    // attendance.save();

    // console.log(session);
    // console.log(student); 
}
