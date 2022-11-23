var express = require('express');
var router = express.Router();
var Auth = require('../authentication')
var UserTypes = require('../../shared/usertypes');

//Require controller
var userController = require('../controllers/user.controller');
 
// Create a new user
router.post("/users/", Auth.AllowedUserType(UserTypes.CourseLeader.Id), userController.create);
 
// Retrieve all users matching query
router.get("/users/", userController.find);
 
// Retrieve a single user with id
router.get("/users/:id", userController.findOne);
 
// Update a user with id
router.put("/users/:id", Auth.AllowedUserType(UserTypes.CourseLeader.Id), userController.update);
 
// Delete a user with id
router.delete("/users/:id", Auth.AllowedUserType(UserTypes.CourseLeader.Id), userController.delete);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('users');
});

module.exports = router;