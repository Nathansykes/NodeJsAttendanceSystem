const mongoose = require('mongoose');
const Auth = require('../authentication')
const UserTypes = require('../../shared/usertypes');
const ErrorHandler = require('../handlers/error.handler');
const Attendance = require("../models/attendanceRecord.model");
const AttendanceDAO = require("../DAO/attendance.DAO");

// Create and Save a new Attendance
exports.create = async (req, res) => {

  var data = req.body;
  try{
    var modelData = data.map(model => createAttendance(model));    
    var data = await AttendanceDAO.tryCreate(modelData);
    res.json(JSON.stringify(data));
  }
  catch(error){
    ErrorHandler.handleError(error, res);
  }
};

function createAttendance(body)
{
  var data = {
    _id: mongoose.Types.ObjectId(body.Id),
    Student: mongoose.Types.ObjectId(body.Student.Id),
    Attendance: body.Attendance,
  }
  var attendance = new Attendance(data);
  
  return attendance;
}

// Retrieve all Attendances from the database.
exports.findAll = async (req, res) => {
    var filter;
    var applicationUser = Auth.getApplicationUser(req);
    if(applicationUser.UserTypeId == UserTypes.Student.Id){
      filter= { Student : applicationUser.Id };// only get attendance records for the current student, if they are a student
    }
    try{
      var data = await AttendanceDAO.tryGet(filter, null, res);
      res.json(JSON.stringify(data));
    }
    catch(error){
      ErrorHandler.handleError(error, res);
    }
};

// Find a single Attendance with an id
exports.findOne = async (req, res) => {

    var filter;
    var applicationUser = Auth.getApplicationUser(req);
    if(applicationUser.UserTypeId == UserTypes.Student.Id){
      filter = { Student : applicationUser.Id };
    }

    try{
      var data = await AttendanceDAO.tryGet(filter, null);
      res.json(JSON.stringify(data));
    }
    catch(error){
      ErrorHandler.handleError(error, res);
    }
};
 
// Update a Attendance by the id in the request
exports.update = async (req, res) => {

  var updateData = {
      Student: req.body.Student,
      Attendance : req.body.Attendance,
  }

  try{
    var data = await AttendanceDAO.tryUpdate(req.params.id, updateData);
    res.json(JSON.stringify(data));
  }
  catch(error){
    ErrorHandler.handleError(error, res);
  }
};
 
// Delete a Attendance with the specified id in the request
exports.delete = (req, res) => {

  try{
    var data = AttendanceDAO.tryDelete(req.params.id, res);
    res.json(JSON.stringify(data));
  }
  catch(error){
    ErrorHandler.handleError(error, res);
  }
};