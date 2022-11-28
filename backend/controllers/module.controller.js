const mongoose = require('mongoose');
const ErrorHandler = require("../handlers/error.handler");
const Module = require("../models/module.model");
const ModuleDAO = require("../DAO/module.DAO");
 
// Create and Save a new Module
exports.create = (req, res) => {

    ModuleDAO.tryCreate(createModule(req.body, res), res);
};

function createModule(body, res)
{
  console.log("trying to create a module");
  var module;

  try 
  {
    var data = {
      _id: mongoose.Types.ObjectId(body.Id),
      Title: body.Title,
      ModuleLeader: body.ModuleLeader,
      Tutors: body.Tutors,
      Sessions: body.Sessions,
      Students: body.Students,
    }
    module = new Module(data);
  }
  catch (error) 
  {
    ErrorHandler.handleError(res, error);
  }

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
exports.findAll = (req, res) => {

    var filter = {};
    if (req.query.Title){
      filter.Title = req.query.Title;
    }

    ModuleDAO.tryGet(filter, populateArgs, res);
};
 
// Find a single Module with an id
exports.findOne = (req, res) => {

  const ids = (req.params.id).replace(/ /g, '').split(",");

  ModuleDAO.tryGet({_id: {$in: ids}}, populateArgs, res);
};

// Update a Module by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;

  var updateData = {
      Title: req.body.Title,
      ModuleLeader: req.body.ModuleLeader,
      Sessions : req.body.Sessions,
      Staff : req.body.Staff,
      Students : req.body.Students,
  }

  ModuleDAO.tryUpdate(id, updateData, res);
};

// Delete a Module with the specified id in the request
exports.delete = (req, res) => {

  ModuleDAO.tryDelete(req.params.id, res);
};