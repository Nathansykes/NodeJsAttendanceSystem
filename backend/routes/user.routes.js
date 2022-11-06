var express = require('express');
var router = express.Router();

//Require controller
var userController = require('../controllers/user.controller');
 
// Create a new user
router.post("/users/", userController.create);
 
// Retrieve all users matching query
router.get("/users/", userController.find);
 
// Retrieve a single user with id
router.get("/users/:id", userController.findOne);
 
// Update a user with id
router.put("/users/:id", userController.update);
 
// Delete a user with id
router.delete("/users/:id", userController.delete);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('users');
});

module.exports = router;