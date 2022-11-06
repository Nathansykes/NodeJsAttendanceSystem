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
        res.send({ message: successMessage });
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
      Tutors: body.Tutors,
      Groups: body.Groups,
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

  const urlParams = new URLSearchParams(req.url);
  const id = urlParams.get('/modules/id');

  Module.findOne({ Id : id }).then(data => 
    {
      res.json(JSON.stringify(data));
    })
};
 
// Update a Module by the id in the request
exports.update = (req, res) => {
 
};
 
// Delete a Module with the specified id in the request
exports.delete = (req, res) => {
 
};