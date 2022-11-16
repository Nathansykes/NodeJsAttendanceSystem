const db = require("../models");
var mongoose = require('mongoose');
const User = require("../models/user.model");
const Student = require("../models/student.model");
const AcademicAdvisor = require("../models/advisor.model");
const ModuleLeader = require("../models/moduleLeader.model");
const CourseLeader = require("../models/courseLeader.model");
const Auth = require("../authentication/");
const UserTypes = require("../../shared/usertypes");
const Generic = require("../generic/functions");

// Create and Save a new User
exports.create = async (req, res) => {
    if (!req.body.FirstName) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }

      // Create a User model object
      const user = await createUserFromBody(req.body, res);

      // Save User in the database
      try {
        user
        .save()
        .then(data => {
          console.log(`User saved in the database: ${data}`);
          res.json(JSON.stringify(data));
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

async function createUserFromBody(body, res) {
  var user;
  var passwordHash = await Auth.createHash(body.Password);
  try 
  {
    var data = {
      _id: Generic.CreateObjectId(body.Id),
      AccessLevel: body.AccessLevel,
      FirstName: body.FirstName,
      LastName: body.LastName,
      Password: passwordHash,
    }
  }
  catch (error) {
    console.log(error);
    res.send({ message: error.toString() });
  }

  if (body.UserType) {
    var userType = parseInt(body.UserType);
  } // check userType is able to be parsed

  return await createUser(data, userType);
}

async function createUser(data, userType)
{
  var errorMessage = `User could not be created: ${userType} is not a valid UserType.`;

  var user;
  try {
    switch (userType) {
      case UserTypes.Student.Id:
        user = new Student(data);
        break;
      case UserTypes.AcademicAdvisor.Id:
        user = new AcademicAdvisor(data);
        break;
      case UserTypes.ModuleLeader.Id:
        user = new ModuleLeader(data);
        break;
      case UserTypes.CourseLeader.Id:
        user = new CourseLeader(data);
        break;
      default:
        throw errorMessage;
    }
  }
  catch (error) {
    console.log(error);
  }
  return user;
}
exports.createUser = createUser;

// Find all users matching query
exports.find = (req, res) =>
{
  var filter = {};
  if (req.query.firstname){
    filter.FirstName = req.query.firstname;
  }
  if (req.query.lastname){
    filter.LastName = req.query.lastname;
  }
  if(req.query.UserType){
    var userType = parseInt(req.query.UserType);
  }
  switch(userType)
  {
    case UserTypes.Student.Id:
      Student.find(filter).then(data =>
        {
          res.json(JSON.stringify(data));
        });
      break;
    case UserTypes.All.Id:
    case undefined:
    case null:
      User.find(filter).then(data =>
        {
          res.json(JSON.stringify(data));
        });
      break;
    default:
      res.status(500).send("UserType is not valid.");
      break;
  }
};

// Find a single User with an id
exports.findOne = (req, res) => {

  const id = req.params.id.toString().padStart(24, '0');

  User.findById(id).then(data =>
    {
      res.json(JSON.stringify(data));
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {

  const id = req.params.id.toString().padStart(24, '0');
  
  var updateData = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
  }

  User.findByIdAndUpdate(id, updateData, {new : true}).then(data =>  {
    if (data)
    {
      console.log("Updated User : ", data);
      res.json(JSON.stringify(data));
    }
    else
    {
      console.log(err)
      res.send({message : err});
    };
  });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  
  const id = req.params.id.toString().padStart(24, '0');

  User.findByIdAndDelete(id).then(data => 
    {
      if (data) 
      {
        const message = `User deleted: ${data}`;
        console.log(message)
        res.send({message : message});
      }
      else 
      {
        res.send({message : `Error. No user matches the Id: ${id}`})
      }
    });
};