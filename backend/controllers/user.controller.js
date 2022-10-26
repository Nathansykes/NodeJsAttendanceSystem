const db = require("../models");
var mongoose = require('mongoose');
const User = db.Users;
const Student = db.Students;
 
// Create and Save a new User
exports.create = (req, res) => {
    if (!req.body.FirstName) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
      
      // Create a User model object
      const user = new Student({
        Id: req.body.Id,
        AccessLevel: req.body.AccessLevel,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
      });
      
      // Save User in the database
      user
        .save()
        .then(data => {
          console.log("User saved in the database: " + data);
          res.redirect('/index');
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        });
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
