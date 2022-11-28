const mongoose = require('mongoose');
const ErrorHandler = require("../handlers/error.handler");
const Course = require("../models/course.model");
const CourseDAO = require("../DAO/course.DAO");
const Generic = require("../generic/functions");
 
// Create and Save a new Course
exports.create = async (req, res) => {
  try{
    var data = await CourseDAO.tryCreate(createCourse(req.body), res);
    res.json(JSON.stringify(data));
  }
  catch(error){
    ErrorHandler.handleError(res, error);
  }
};

function createCourse(body) {
  console.log("trying to create a course");
  var course;
  var data = {
    _id: Generic.CreateObjectId(body.Id),
    CourseLeader: body.CourseLeader,
    Title: body.Title,
    Modules : body.Modules?.split(","),
  }
  course = new Course(data);
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
exports.findAll = async (req, res) => {
  var filter = {};
  if (req.query.Title){
    filter.Title = req.query.Title;
  }

  try{
    var data = await CourseDAO.tryGet(filter, populateArgs);
    res.json(JSON.stringify(data));
  }
  catch(error){
    ErrorHandler.handleError(res, error);
  }
};
 
// Find a single Course with an id
exports.findOne = async (req, res) => {
  try{
    const ids = (req.params.id).replace(/ /g, '').split(",");
    var data = await CourseDAO.tryGet({ _id: { $in: ids } }, populateArgs);
    res.json(JSON.stringify(data));
  }
  catch(error){
    ErrorHandler.handleError(res, error);
  }
};
  
// Update a Course by the id in the request
exports.update = async (req, res) => {
  var updateData = {
      CourseLeader: req.body.CourseLeader,
      Title: req.body.Title,
  }

  try{
    var data = await CourseDAO.tryUpdate(req.params.id, updateData);
    if(req.body.Modules){
      var moduleList = req.body.Modules.split(",");
      data = await CourseDAO.tryAddToArrayField(req.params.id, "Modules", moduleList);
    }
    res.json(JSON.stringify(data));
  }
  catch(error){
    ErrorHandler.handleError(res, error);
  }  
};

// Delete a Course with the specified id in the request
exports.delete = async (req, res) => {

  try{
    var data = await CourseDAO.tryDelete(req.params.id);
    res.json(JSON.stringify(data));
  }
  catch(error){
    ErrorHandler.handleError(res, error);
  }

};