const db = require("../models");
var mongoose = require('mongoose');
let Attendance = require("../models/attendanceRecord.model");
 
// Create and Save a new Attendance
exports.create = (req, res) => {
      
      // Create a Attendance model object
      const attendance = createAttendance(req.body, res);
      
      // Save Attendance in the database
      try {
        attendance
        .save()
        .then(data => {
          var successMessage = `Attendance saved in the database: ${data}`;
          console.log(successMessage);
          res.send({ message: successMessage });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Attendance."
          });
        });
        return;
      } catch (error) {
        console.log(error);
      }
};

function createAttendance(body, res)
{
  try 
  {
    var data = {
      _id: mongoose.Types.ObjectId(body.Id),
      SessionID: body.SessionID,
      Student: body.Student,
      Attendance: body.Attendance,
      Late: body.Late
    }
    var attendance = new Attendance(data);
  }
  catch (error) 
  {
    console.log(error);
    res.send({ message : error.toString()});
  }

  return attendance;
}
 
// Retrieve all Attendances from the database.
exports.findAll = (req, res) => {
  Attendance.find().then(data => 
    {
      res.json(JSON.stringify(data));
    });
};
 
// Find a single Attendance with an id
exports.findOne = (req, res) => {

  const urlParams = new URLSearchParams(req.url);
  const id = urlParams.get('/attendances/id');

  Attendance.findOne({ Id : id }).then(data => 
    {
      res.json(JSON.stringify(data));
    })
};
 
// Update a Attendance by the id in the request
exports.update = (req, res) => {
 
};
 
// Delete a Attendance with the specified id in the request
exports.delete = (req, res) => {
 
};