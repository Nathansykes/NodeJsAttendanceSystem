const db = require("../models");
var mongoose = require('mongoose');
let User = require("../models/user.model");
let Student = require("../models/student.model");

const UserType = {
    Student: 'Student',
    AcademicAdvisor: 'AcademicAdvisor',
    ModuleLeader: 'ModuleLeader',
    CourseLeader: 'CourseLeader',
}
 
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
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        });
        return;
      } catch (error) {
        console.log(error);
      }
};

function createUser(body, res)
{
  var user;
  var errorMessage = `User could not be created: ${body.UserType} is not a valid UserType.`;

  var data = {
    Id: body.Id,
    AccessLevel: body.AccessLevel,
    FirstName: body.FirstName,
    LastName: body.LastName,
  }

  try 
  {
    switch(body.UserType) 
    {
      case userType.Student:
        user = new Student(data);
        break;
        default:
          throw errorMessage;
    }
  }
  catch (error) 
  {
    console.log(error);
  }

  return user;
}
 
// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  var users = getAllUsers(req.body, res);
  res.json(JSON.stringify(users));

  // User.find().then(data => 
  //   {
  //     res.json(JSON.stringify(data));
  //   });
};

function getAllUsers(body, res)
{
  var user;
  var errorMessage = `${body.UserType} is not a valid UserType.`;

  try 
  {
    var users;
    switch(body.UserType) 
    {
      case userType.Student:
        Student.find().then(data => users);
        break;
      case "All":
        User.find().then(data => users);
        break;
        default:
          throw errorMessage;
    }
    if(users){
      res.json(JSON.stringify(users));
    }
  }
  catch (error) 
  {
    console.log(error);
  }

  return user;
}
 
// Find a single User with an id
exports.findOne = (req, res) => {

  const urlParams = new URLSearchParams(req.url);
  const id = urlParams.get('/users/id');

  User.findOne({ Id : id }).then(data => 
    {
      res.json(JSON.stringify(data));
    })
};
 
// Update a User by the id in the request
exports.update = (req, res) => {
 
};
 
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
 
};