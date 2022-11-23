var express = require('express');
var router = express.Router();
var Auth = require('../authentication')
var UserTypes = require('../../shared/usertypes');

//Require controller
var moduleController = require('../controllers/module.controller');
 
// Create a new module
router.post("/modules/", Auth.AllowedUserType(UserTypes.ModuleLeader.Id), moduleController.create);
 
// Retrieve all modules
router.get("/modules/", moduleController.findAll);
 
// Retrieve a single module with id
router.get("/modules/:id", moduleController.findOne);
 
// Update a module with id
router.put("/modules/:id", Auth.AllowedUserType(UserTypes.ModuleLeader.Id), moduleController.update);
 
// Delete a module with id
router.delete("/modules/:id", Auth.AllowedUserType(UserTypes.ModuleLeader.Id), moduleController.delete);

/* GET modules listing. */
router.get('/', function(req, res, next) {
  res.send('modules');
});

module.exports = router;