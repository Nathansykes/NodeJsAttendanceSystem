const mongoose = require('mongoose');
const Auth = require('../authentication')
const UserTypes = require('../../shared/usertypes');
const ErrorHandler = require('../handlers/error.handler');
const Attendance = require("../models/attendanceRecord.model");
const AttendanceDAO = require("../DAO/attendance.DAO");

// Create and Save a new Attendance
exports.create = (req, res) => {

      var data = req.body;
      var modelData = data.map(model => createAttendance(model, res));
      
      AttendanceDAO.tryCreate(modelData, res);
};

function createAttendance(body, res)
{
  try
  {
    var data = {
      _id: mongoose.Types.ObjectId(body.Id),
      Student: mongoose.Types.ObjectId(body.Student.Id),
      Attendance: body.Attendance,
    }
    var attendance = new Attendance(data);
  }
  catch (error) 
  {
    ErrorHandler.handleError(res, error);
  }

  return attendance;
}

// Retrieve all Attendances from the database.
exports.findAll = (req, res) => {
    var filter;
    var applicationUser = Auth.getApplicationUser(req);
    if(applicationUser.UserTypeId == UserTypes.Student.Id){
      filter= { Student : applicationUser.Id };// only get attendance records for the current student, if they are a student
    }

    AttendanceDAO.tryGet(filter, null, res);
};

// Find a single Attendance with an id
exports.findOne = (req, res) => {

    var filter;
    var applicationUser = Auth.getApplicationUser(req);
    if(applicationUser.UserTypeId == UserTypes.Student.Id){
      filter = { Student : applicationUser.Id };
    }

    AttendanceDAO.tryGet(filter, null, res);
};
 
// Update a Attendance by the id in the request
exports.update = (req, res) => {

    var updateData = {
        Student: req.body.Student,
        Attendance : req.body.Attendance,
    }

    AttendanceDAO.tryUpdate(req.params.id, updateData, res);
};
 
// Delete a Attendance with the specified id in the request
exports.delete = (req, res) => {

  AttendanceDAO.tryDelete(req.params.id, res);
};