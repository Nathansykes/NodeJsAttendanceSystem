const mongoose = require('mongoose');
const Session = require("../models/session.model");
const Auth = require("../authentication");
const ErrorHandler = require("../handlers/error.handler");
const SessionDAO = require("../DAO/session.DAO");
const Generic = require("../generic/functions");
const UserTypes = require("../../shared/usertypes");
// Create and Save a new Session
exports.create = async (req, res) => {
  try {
    var data = await SessionDAO.tryCreate(createSession(req.body, res), res);
    res.json(JSON.stringify(data));
  }
  catch (error) {
    ErrorHandler.handleError(res, error);
  }
};

function createSession(body) {
  var session;

  var data = {
    _id: Generic.CreateObjectId(body.Id),
    Title: body.Title,
    Location: body.Location,
    DateAndTime: new Date(body.DateAndTime),
  }
  if(body.Students){
    data.Students = body.Students.split(",").map(id => Generic.CreateObjectId(id));
  }
  if(body.AttendanceRecords){
    data.AttendanceRecords = body.AttendanceRecords.split(",").map((id) => Generic.CreateObjectId(id));
  }
  session = new Session(data);

  return session;
}

var populateArgs = [{
  path: 'Students',
  model: 'Student',
},
{
  path: 'AttendanceRecords',
  model: 'AttendanceRecord',
}];

// Retrieve all Sessions from the database.
exports.findAll = async (req, res) => {
  var appUser = Auth.getApplicationUser(req);
  var filter = {};
  var field;
  var title;
  if (req.query.Title) {
    title = "Title";
  }
  if(appUser.UserTypeId == UserTypes.Tutor.Id){
    field = "Tutors";
  }
  if(appUser.UserTypeId == UserTypes.ModuleLeader.Id){
    field = "ModuleLeader";
  }

  var coursePopulateArgs = [{
    path: 'Modules',
    model: 'Module',
    match: field ? { [field]: appUser.Id } : {},
    populate: {
      path: 'Sessions',
      model: 'Session',
      match: title ? { [title]: req.query.Title } : {},
      populate: [{
        path: 'Students',
        model: 'Student',
      },
      {
        path: 'AttendanceRecords',
        model: 'AttendanceRecord',
      }]
    }
  }];


  try {
    var data = await SessionDAO.tryGet(filter, coursePopulateArgs, true);
    res.json(JSON.stringify(data));
  }
  catch (error) {
    ErrorHandler.handleError(res, error);
  }
};

exports.findAllForUser = async (req, res) => {

  var userId = Auth.getApplicationUser(req).Id;

  try {
    var data = await SessionDAO.tryGet({ Students: userId }, populateArgs, false);
    res.json(JSON.stringify(data));
  }
  catch (error) {
    ErrorHandler.handleError(res, error);
  }
};


// Find a single Session with an id
exports.findOne = async (req, res) => {
  try {
    const ids = (req.params.id).replace(/ /g, '').split(",");
    var data = await SessionDAO.tryGet({ _id: { $in: ids } }, populateArgs, false);
    res.json(JSON.stringify(data));
  }
  catch (error) {
    ErrorHandler.handleError(res, error);
  }
};

// Update a Session by the id in the request
exports.update = async (req, res) => {

  const id = req.params.id;

  var updateData = {
    Title: req.body.Title,
    Location: req.body.Location,
  }

  try {
    if (req.body.DateAndTime) {
      updateData.DateAndTime = new Date(req.body.DateAndTime);
    }
    var updatedData = await SessionDAO.tryUpdate(id, updateData);

    if(req.body.AttendanceRecords) {
      var attendanceRecordsList = req.body.AttendanceRecords.split(",").map((id) => Generic.CreateObjectId(id));
      data = await SessionDAO.tryAddToArrayField(id, "AttendanceRecords", attendanceRecordsList);
    }
    if(req.body.Students) {
      var studentsList = req.body.Students.split(",").map(id => Generic.CreateObjectId(id));
      data = await SessionDAO.tryAddToArrayField(id, "Students", studentsList);
    }
    res.json(JSON.stringify(updatedData));
  }
  catch (error) {
    ErrorHandler.handleError(res, error)
  }
};

// Delete a Session with the specified id in the request
exports.delete = async (req, res) => {
  try {
    var deletedData = await SessionDAO.tryDelete(req.params.id, res);
    res.json(JSON.stringify(deletedData));
  }
  catch (error) {
    ErrorHandler.handleError(res, error);
  }
};