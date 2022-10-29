const db = require("../models");
var mongoose = require('mongoose');
let User = require("../models/user.model");
let Student = require("../models/student.model");
 
// Create and Save a new User
exports.create = (req, res) => {
    if (!req.body.FirstName) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
      
      // Create a User model object
      const user = createUser(req.body, res);
      
      // Save User in the database
      try {
        user
        .save()
        .then(data => {
          var successMessage = `User saved in the database: ${data}`;
          console.log(successMessage);
          res.send({ message: successMessage });
          res.redirect('/index');
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        });
      } catch (error) {
        console.log(error);        
      }
      
};

function createUser(body, res)
{
  var user;
  var errorMessage = `User could not be created: ${body.UserType} is not a valid UserType.`;

  var schema = {
    Id: body.Id,
    AccessLevel: body.AccessLevel,
    FirstName: body.FirstName,
    LastName: body.LastName,
  }

  try 
  {
    switch(body.UserType) 
    {
      case "Student":
        user = new Student(schema);
        break;
        default:
          res.send({message : errorMessage});
          throw errorMessage;
    }
  }
  catch (error) 
  {
    console.log(error);
    res.send({message : error});
  }

  return user;
}
 
// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.find().then(data => 
    {
      res.send(data);
    });
};
 
// Find a single User with an id
exports.findOne = (req, res) => {

  const urlParams = new URLSearchParams(req.url);
  const id = urlParams.get('/users/id');

  User.findOne({ Id : id }).then(data => 
    {
      res.send(data);
    })
};
 
// Update a User by the id in the request
exports.update = (req, res) => {
 
};
 
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
 
};