var express = require('express');
var router = express.Router();

//Require controller
var moduleController = require('../controllers/module.controller');
 
// Create a new module
router.post("/modules/", moduleController.create);
 
// Retrieve all modules
router.get("/modules/", moduleController.findAll);
 
// Retrieve a single module with id
router.get("/modules/:id", moduleController.findOne);
 
// Update a module with id
router.put("/modules/:id", moduleController.update);
 
// Delete a module with id
router.delete("/modules/:id", moduleController.delete);

/* GET modules listing. */
router.get('/', function(req, res, next) {
  res.send('modules');
});

module.exports = router;