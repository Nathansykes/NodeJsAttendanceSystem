var express = require('express');
var router = express.Router();

//Require controller
var sessionController = require('../controllers/session.controller');
 
// Create a new session
router.post("/sessions/", sessionController.create);
 
// Retrieve all sessions
router.get("/sessions/", sessionController.findAll);
 
// Retrieve a single session with id
router.get("/sessions/:id", sessionController.findOne);
 
// Update a session with id
router.put("/sessions/:id", sessionController.update);
 
// Delete a session with id
router.delete("/sessions/:id", sessionController.delete);

/* GET sessions listing. */
router.get('/', function(req, res, next) {
  res.send('sessions');
});

module.exports = router;