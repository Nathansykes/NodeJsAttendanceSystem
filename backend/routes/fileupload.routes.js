var express = require('express');
var router = express.Router();

//Require controller
var importController = require('../controllers/fileimport.controller');
 
// Create a new module
router.post("/fileimport/users", importController.importUsers);



module.exports = router;