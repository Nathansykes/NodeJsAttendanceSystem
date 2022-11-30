const mongoose = require('mongoose');
const ErrorHandler = require("../handlers/error.handler");
const Course = require("../models/course.model");
const CourseDAO = require("../DAO/course.DAO");
const Generic = require("../generic/functions");
const Auth = require("../authentication");
const UserTypes = require("../../shared/userTypes");
 
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
  }
  if(body.Modules){
    data.Modules = body.Modules.split(",").map((id) => Generic.CreateObjectId(id));
  }
  course = new Course(data);
  return course;
}

function GetPopulateArgs(userTypeId, userId){
  var populateArgs = {};
  switch (userTypeId){
    case UserTypes.ModuleLeader.Id:
      populateArgs = {
        path: 'Modules',
        model: 'Module',
        match: { ModuleLeader: userId },
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
      break;
    case UserTypes.Tutor.Id:
      populateArgs = {
        path: 'Modules',
        model: 'Module',
        match: { Tutors: userId },
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
      break;
    default:
      populateArgs = {
        path: 'Modules',
        model: 'Module',
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
      break;
  }
  return populateArgs;
}

 
// Retrieve all Courses from the database.
exports.findAll = async (req, res) => {
  var filter = {};
  if (req.query.Title){
    filter.Title = req.query.Title;
  }

  var applicationUser = Auth.getApplicationUser(req);      
  var populateArgs = GetPopulateArgs(applicationUser.UserTypeId, applicationUser.Id);

  if(applicationUser.UserTypeId == UserTypes.CourseLeader.Id){
    filter.CourseLeader = applicationUser.Id;
  }
  
  try{
    var data = await CourseDAO.tryGet(filter, populateArgs);
    var returnData = data.filter(x => x.Modules.length > 0);
    res.json(JSON.stringify(returnData));
  }
  catch(error){
    ErrorHandler.handleError(res, error);
  }
};
 
// Find a single Course with an id
exports.findOne = async (req, res) => {
  try{

    var applicationUser = Auth.getApplicationUser(req);      
    var populateArgs = GetPopulateArgs(applicationUser.UserTypeId, applicationUser.Id);
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
      var moduleList = req.body.Modules.split(",").map((id) => Generic.CreateObjectId(id));
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