const mongoose = require('mongoose');
const ErrorHandler = require("../handlers/error.handler");
const Module = require("../models/module.model");
const ModuleDAO = require("../DAO/module.DAO");
const Generic = require("../generic/functions");

// Create and Save a new Module
exports.create = async (req, res) => {
  try {
    var data = await ModuleDAO.tryCreate(createModule(req.body, res), res);
    res.json(JSON.stringify(data));
  }
  catch (error) {
    ErrorHandler.handleError(res, error);
  }
};

function createModule(body, res) {
  console.log("trying to create a module");
  var module;
  var data = {
    _id: Generic.CreateObjectId(body.Id),
    Title: body.Title,
    ModuleLeader: body.ModuleLeader,
  }
  if(body.Tutors){
    var tutorList = body.Tutors.split(",").map((id) => Generic.CreateObjectId(id));
    data.Tutors = tutorList;
  }
  if(body.Sessions)  {
    var sessionList = body.Sessions.split(",").map((id) => Generic.CreateObjectId(id));
    data.Sessions = sessionList;
  }
  module = new Module(data);
  return module;
}

var populateArgs = {
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

// Retrieve all Modules from the database.
exports.findAll = async (req, res) => {

  var filter = {};
  if (req.query.Title) {
    filter.Title = req.query.Title;
  }
  try {
    var data = await ModuleDAO.tryGet(filter, populateArgs, res);
    res.json(JSON.stringify(data));
  }
  catch (error) {
    ErrorHandler.handleError(res, error);
  }
};

// Find a single Module with an id
exports.findOne = async (req, res) => {
  try {
    const ids = (req.params.id).replace(/ /g, '').split(",");

    var data = await ModuleDAO.tryGet({ _id: { $in: ids } }, populateArgs, res);
    res.json(JSON.stringify(data));
  }
  catch (error) {
    ErrorHandler.handleError(res, error);
  }
};

// Update a Module by the id in the request
exports.update = async (req, res) => {

  const id = req.params.id;

  var updateData = {
    Title: req.body.Title,
    ModuleLeader: req.body.ModuleLeader,
    Sessions: req.body.Sessions,
    Staff: req.body.Staff,
    Students: req.body.Students,
  }
  try {
    var data = await ModuleDAO.tryUpdate(id, updateData, res);
    res.json(JSON.stringify(data));
  }
  catch (error) {
    ErrorHandler.handleError(res, error);
  }
};

// Delete a Module with the specified id in the request
exports.delete = async (req, res) => {
  try {
    var data = await ModuleDAO.tryDelete(req.params.id, res);
    res.json(JSON.stringify(data));
  }
  catch (error) {
    ErrorHandler.handleError(res, error);
  }
};