const mongoose = require('mongoose');
const ErrorHandler = require("../handlers/error.handler");
const Course = require("../models/course.model");
const CourseDAO = require("../DAO/course.DAO");
 
// Create and Save a new Course
exports.create = (req, res) => {

    CourseDAO.tryCreate(createCourse(req.body, res), res);
};

function createCourse(body, res)
{
  console.log("trying to create a course");
  var course;

  try 
  {
    var data = {
      _id: mongoose.Types.ObjectId(body.Id),
      CourseLeader: body.CourseLeader,
      Title: body.Title,
      Modules : body.Modules,
    }
    course = new Course(data);
  }
  catch (error) 
  {
    ErrorHandler.handleError(res, error);
  }

  return course;
}

var populateArgs = { 
  path: 'Modules',
  populate: {
    path: 'Sessions',
    model: 'Session',
    populate: [{
      path: 'Students',
      model: 'Student',
    },
    {
      path: 'AttendanceRecords',
      model: 'AttendanceRecord',
    }]
  } 
}
 
// Retrieve all Courses from the database.
exports.findAll = (req, res) => {

  var filter = {};
  if (req.query.Title){
    filter.Title = req.query.Title;
  }

  CourseDAO.tryGet(filter, populateArgs, res);
};
 
// Find a single Course with an id
exports.findOne = (req, res) => {

  const ids = (req.params.id).replace(/ /g, '').split(",");

  CourseDAO.tryGet({ _id: { $in: ids } }, populateArgs, res);
};
  
// Update a Course by the id in the request
exports.update = (req, res) => {

  var updateData = {
      CourseLeader: req.body.CourseLeader,
      Title: req.body.Title,
      Modules : req.body.Modules,
  }

  CourseDAO.tryUpdate(req.params.id, updateData, res);
  
};

// Delete a Course with the specified id in the request
exports.delete = (req, res) => {

  CourseDAO.tryDelete(req.params.id, res);

};