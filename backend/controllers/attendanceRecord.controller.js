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
          res.json(JSON.stringify(data));
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
      Student: body.Student,
      Attendance: body.Attendance,
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

  const id = req.query.id;

  Attendance.findOne({ Id : id }).then(data => 
    {
      res.json(JSON.stringify(data));
    })
};
 
// Update a AttendanceRecord by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;

  var updateData = {
      Student: req.body.Student,
      Attendance : req.body.Attendance,
  }

  Attendance.findByIdAndUpdate(id, updateData, {new : true}).then(data =>  
    {
        if (data)
        {
            console.log("Updated AttendanceRecord : ", data);
            res.json(JSON.stringify(data));
        }
        else
        {
            console.log(err)
            res.send({message : err});
        };
    });
};

// Delete a AttendanceRecord with the specified id in the request
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
    });
};