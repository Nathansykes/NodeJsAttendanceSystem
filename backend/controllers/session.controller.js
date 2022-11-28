const mongoose = require('mongoose');
const Session = require("../models/session.model");
const Auth = require("../authentication");
const ErrorHandler = require("../handlers/error.handler");
const SessionDAO = require("../DAO/session.DAO");
const Generic = require("../generic/functions");

// Create and Save a new Session
exports.create = async (req, res) => {
  try {
    var data = await SessionDAO.tryCreate(createSession(req.body, res), res);
    res.json(JSON.stringify(data));
  }
  catch (error) {
    ErrorHandler.handleError(error, res);
  }
};

function createSession(body) {
  var session;

  var data = {
    _id: mongoose.Types.ObjectId(body.Id),
    Title: body.Title,
    Location: body.Location,
    DateAndTime: new Date(body.DateAndTime),
    Students: body.Students?.split(",").map(id => id.toString().padStart(24, "0")),
    AttendanceRecords: body.AttendanceRecords?.split(",").map(id => Generic.CreateObjectId(id)),
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

  var filter = {};
  if (req.query.Title) {
    filter.Title = req.query.Title;
  }

  try {
    var data = await SessionDAO.tryGet(filter, populateArgs, res);
    res.json(JSON.stringify(data));
  }
  catch (error) {
    ErrorHandler.handleError(error, res);
  }
};

exports.findAllForUser = async (req, res) => {

  var userId = Auth.getApplicationUser(req).Id;

  try {
    var data = await SessionDAO.tryGet({ Students: userId }, populateArgs, res);
    res.json(JSON.stringify(data));
  }
  catch (error) {
    ErrorHandler.handleError(error, res);
  }
};


// Find a single Session with an id
exports.findOne = async (req, res) => {
  try {
    const ids = (req.params.id).replace(/ /g, '').split(",");
    var data = await SessionDAO.tryGet({ _id: { $in: ids } }, populateArgs, res);
    res.json(JSON.stringify(data));
  }
  catch (error) {
    ErrorHandler.handleError(error);
  }
};

// Update a Session by the id in the request
exports.update = async (req, res) => {

  const id = req.params.id;

  var updateData = {
    Title: req.body.Title,
    Location: req.body.Location,
    Students: req.body.Students,
    AttendanceRecords: req.body.AttendanceRecords,
  }

  try {
    if (req.body.DateAndTime) {
      updateData.DateAndTime = new Date(req.body.DateAndTime);
    }

    var updatedData = await SessionDAO.tryUpdate(id, updateData);
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
    ErrorHandler.handleError(error, res);
  }
};