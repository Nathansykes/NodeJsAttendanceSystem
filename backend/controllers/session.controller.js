const mongoose = require('mongoose');
const Session = require("../models/session.model");
const Auth = require("../authentication");
const ErrorHandler = require("../handlers/error.handler");
const SessionDAO = require("../DAO/session.DAO");

// Create and Save a new Session
exports.create = (req, res) => {

  SessionDAO.tryCreate(createSession(req.body, res), res);
};

function createSession(body, res) {
  console.log("trying to create a session");
  var session;

  try {
    var data = {
      _id: mongoose.Types.ObjectId(body.Id),
      Title: body.Title,
      Location: body.Location,
      DateAndTime: new Date(body.DateAndTime),
      Students: body.Students,
      AttendanceRecords: body.AttendanceRecords,
    }
    session = new Session(data);
  }
  catch (error) {
    ErrorHandler.handleError(res, error);
  }

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
exports.findAll = (req, res) => {

  var filter = {};
  if (req.query.Title) {
    filter.Title = req.query.Title;
  }

  SessionDAO.tryGet(filter, populateArgs, res);
};

exports.findAllForUser = (req, res) => {

  var userId = Auth.getApplicationUser(req).Id;

  SessionDAO.tryGet({ Students: userId }, populateArgs, res);
};


// Find a single Session with an id
exports.findOne = (req, res) => {

  const ids = (req.params.id).replace(/ /g, '').split(",");

  SessionDAO.tryGet({ _id: { $in: ids } }, populateArgs, res);
};

// Update a Session by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;

  var updateData = {
    Title: req.body.Title,
    Location: req.body.Location,
    Students: req.body.Students,
    AttendanceRecords: req.body.AttendanceRecords,
  }

  if (req.body.DateAndTime) {
    try {
      updateData.DateAndTime = new Date(req.body.DateAndTime);
    }
    catch (error) {
      ErrorHandler.handleError(res, error)
    }
  }

  SessionDAO.tryUpdate(id, updateData, res);
};

// Delete a Session with the specified id in the request
exports.delete = (req, res) => {

  SessionDAO.tryDelete(req.params.id, res);
};