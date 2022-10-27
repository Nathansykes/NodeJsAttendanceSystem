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
      
      var user;
      // Create a User model object
      try {
        user = new Student({
          Id: req.body.Id,
          AccessLevel: req.body.AccessLevel,
          FirstName: req.body.FirstName,
          LastName: req.body.LastName,
        });
      } catch (error) {
        console.log(error);
      }
      
      // Save User in the database
      
      try {
        user
        .save()
        .then(data => {
          console.log("User saved in the database: " + data);
          res.send({ token: token });
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
 
// Retrieve all Users from the database.
exports.findAll = (req, res) => {
 
};
 
// Find a single User with an id
exports.findOne = (req, res) => {
 
};
 
// Update a User by the id in the request
exports.update = (req, res) => {
 
};
 
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
 
};
 
// Delete all Users from the database.
exports.deleteAll = (req, res) => {
 
};
