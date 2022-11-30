const Session = require("../models/session.model");
const Module = require("../models/module.model");
const ErrorHandler = require("../handlers/error.handler");
const Formatter = require("../formatters/models.formatter");
const Course = require("../models/course.model");

// Create Methods
exports.canCreate = () => {
  return true;
}

exports.tryCreate = async (session) => {
  if (this.canCreate) {
    var data = await session.save();
    if (data) {
      console.log(`Session saved in the database: ${data}`);
      return data;
    }
    else {
      throw new Error("Some error occurred while creating the session.");
    }
  }
  else {
    throw new Error("Unable to create the session.");
  }
}

// Get Methods
exports.canGet = () => {
  return true;
}

exports.tryGet = async (filter, populateArgs, res) => {

  if (this.canGet) {
    data = await Course.find(filter).populate(populateArgs).sort({ DateAndTime: 1 });
    if(data) {
      var sessions = data.map(course => course.Modules.map(module => module.Sessions)).flat(2);
      return sessions.map(session => Formatter.formatSession(session))
    }
    else{
      throw new Error("No sessions found.");
    }
  }
  else {
    throw new Error("Unable to get the session.");
  }
}

// Update Methods
exports.canUpdate = () => {
  return true;
}

exports.tryUpdate = async (id, updateData) => {
  if (this.canUpdate) {
    var data = await Session.findByIdAndUpdate(id, updateData, { new: true })
    if (data) {
      console.log("Updated Session : ", data);
      return data;
    }
    else {
      throw new Error(`No session matches the Id: ${id}`);
    }
  }  
  else {
    throw new Error("Unable to update the session.");
  }
}

exports.tryAddToArrayField = async (id, field, items) => {
  if (this.canUpdate) {
      var dataToUpdate = await Session.findOne({ _id: id });
      items.forEach(item => {
        dataToUpdate[field].push(item);
      });
      var updatedData = await dataToUpdate.save();
      return updatedData;
  }
}

// Delete Methods
exports.canDelete = () => {
  return true;
}

exports.tryDelete = async (id) => {
  if (this.canDelete) {
    var deletedData = await Session.findByIdAndDelete(id)
    if (deletedData) {
      console.log("Deleted Session : ", deletedData);
      return data
    }
    else {
      throw new Error(`No session matches the Id: ${id}`);
    }
  }
  else {
    throw new Error("Unable to delete the session.");
  }
}