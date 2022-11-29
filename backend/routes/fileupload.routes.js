var express = require('express');
var router = express.Router();
var Auth = require('../authentication')
var UserTypes = require('../../shared/usertypes');

//Require controller
var importController = require('../controllers/fileimport.controller');
 
// Create a new module
router.post("/fileimport/users", Auth.AllowedUserType(UserTypes.CourseLeader.Id), importController.importUsers);
router.post("/fileimport/attendance", Auth.AllowedUserType(UserTypes.Tutor.Id), importController.importAttendance);



module.exports = router;