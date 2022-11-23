var express = require('express');
var router = express.Router();
var Auth = require('../authentication')
var UserTypes = require('../../shared/usertypes');

//Require controller
var sessionController = require('../controllers/session.controller');
 
// Create a new session
router.post("/sessions/", Auth.AllowedUserType(UserTypes.ModuleLeader.Id), sessionController.create);
 
// Retrieve all sessions
router.get("/sessions/", sessionController.findAll);
 
// Retrieve a single session with id
router.get("/sessions/:id", sessionController.findOne);
 
// Update a session with id
router.put("/sessions/:id", Auth.AllowedUserType(UserTypes.Tutor.Id), sessionController.update);
 
// Delete a session with id
router.delete("/sessions/:id", Auth.AllowedUserType(UserTypes.ModuleLeader.Id), sessionController.delete);

/* GET sessions listing. */
router.get('/', function(req, res, next) {
  res.send('sessions');
});

module.exports = router;