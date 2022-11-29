var express = require('express');
var router = express.Router();
var Auth = require('../authentication')
var UserTypes = require('../../shared/usertypes');

var reportingController = require('../controllers/reporting.controller');
 
router.get("/reporting/student", reportingController.GetAttendanceForStudent);

router.get("/reporting/module", Auth.AllowedUserType(UserTypes.AcademicAdvisor.Id), reportingController.GetAttendanceForModule);

router.get("/reporting/course", Auth.AllowedUserType(UserTypes.AcademicAdvisor.Id), reportingController.GetAttendanceForCourse);

router.post("/reporting/download", reportingController.DownloadReport);

module.exports = router;