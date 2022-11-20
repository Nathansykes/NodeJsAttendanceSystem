const db = require("../models");
var mongoose = require('mongoose');
const Module = require("../models/module.model");
 
// Create and Save a new Module
exports.create = (req, res) => {

    // Create a Module model object
    const module = createModule(req.body, res);
    
    console.log(module);
    // Save Module in the database
    try {
      module
      .save()
      .then(data => {
          var successMessage = `Module saved in the database: ${data}`;
          console.log(successMessage);
          res.json(JSON.stringify(data));
      })
      .catch(err => {
          res.status(500).send({
          message:
              err.message || "Some error occurred while creating the Module."
          });
      });
      return;
    } 
    catch (error) 
    {
      console.log(error);
    }
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
    console.log(error);
    res.send({ message : error.toString()});
  }

  return module;
}
 
// Retrieve all Modules from the database.
exports.findAll = (req, res) => {
  Module.find().then(data => 
    {
      res.json(JSON.stringify(data));
    });
};
 
// Find a single Module with an id
exports.findOne = (req, res) => {

  const ids = (req.params.id).replace(/ /g, '').split(",");

  Module.find({_id: {$in: ids}}).then(data =>
  {
    res.json(JSON.stringify(data));
  })
  .catch(error => 
  {
    res.send({message : error});
  });
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

  Module.findByIdAndUpdate(id, updateData, {new : true}).then(data =>  
  {
      if (data)
      {
          console.log("Updated Module : ", data);
          res.json(JSON.stringify(data));
      }
      else
      {
          console.log(err)
          res.send({message : err});
      };
  });
};

// Delete a Module with the specified id in the request
exports.delete = (req, res) => {

const id = req.params.id;

Module.findByIdAndDelete(id).then(data => 
  {
    if (data) 
    {
      const message = `Module deleted: ${data}`;
      console.log(message)
      res.send({message : message});
    }
    else 
    {
        res.send({message : `Error. No module matches the Id: ${id}`})
    }
  });
};