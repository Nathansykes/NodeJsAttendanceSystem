const db = require("../models");
const mongoose = require('mongoose');
const Attendance = require("../models/attendanceRecord.model");
const Auth = require('../authentication')
const UserTypes = require('../../shared/usertypes');
const ErrorHandler = require('../handlers/error.handler');

// Create and Save a new Attendance
exports.create = (req, res) => {

      var data = req.body;
      var modelData = data.map(model => createAttendance(model, res));
      
      Attendance.insertMany(modelData)
      .then(data => {
        var successMessage = `Attendance saved in the database: ${data}`;
        console.log(successMessage);
        res.json(JSON.stringify(data));
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Attendance."
        });
      });
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

    Attendance.find(filter).then(data =>
    {
      res.json(JSON.stringify(data));
    })
    .catch(error => ErrorHandler.handleError(res, error));
};

// Find a single Attendance with an id
exports.findOne = (req, res) => {

    const id = req.query.id;
    var filter;
    var applicationUser = Auth.getApplicationUser(req);
    if(applicationUser.UserTypeId == UserTypes.Student.Id){
      filter = { Student : applicationUser.Id };
    }

    Attendance.findOne(filter).then(data =>
    {
        res.json(JSON.stringify(data));
    })
    .catch(error => ErrorHandler.handleError(res, error));
};
 
// Update a Attendance by the id in the request
exports.update = (req, res) => {

    const id = req.params.id;

    var updateData = {
        Student: req.body.Student,
        Attendance : req.body.Attendance,
    }

    Attendance.findByIdAndUpdate(id, updateData, {new : true}).then(data =>  
    {
        console.log("Updated AttendanceRecord : ", data);
        res.json(JSON.stringify(data));
    })
    .catch(error => ErrorHandler.handleError(res, error));
};
 
// Delete a Attendance with the specified id in the request
exports.delete = (req, res) => {

  const id = req.params.id;

  Attendance.findByIdAndDelete(id).then(data => 
    {
      if (data) 
      {
        const message = `AttendanceRecord deleted: ${data}`;
        console.log(message)
        res.send({message : message});
      }
      else 
      {
          res.send({message : `Error. No attendancerecord matches the Id: ${id}`})
      }
    })
    .catch(error => ErrorHandler.handleError(res, error));
};