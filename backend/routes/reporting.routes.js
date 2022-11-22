var express = require('express');
var router = express.Router();

var reportingController = require('../controllers/reporting.controller');
 
router.get("/reporting/student", reportingController.GetAttendanceForStudent);

router.get("/reporting/module", reportingController.GetAttendanceForModule);

router.get("/reporting/course", reportingController.GetAttendanceForCourse);

module.exports = router;