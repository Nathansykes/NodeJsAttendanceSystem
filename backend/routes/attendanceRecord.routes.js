var express = require('express');
var router = express.Router();

//Require controller
var attendanceController = require('../controllers/attendanceRecord.controller');
 
// Create a new attendance
router.post("/attendanceRecords/", attendanceController.create);
 
// Retrieve all attendances
router.get("/attendanceRecords/", attendanceController.findAll);
 
// Retrieve a single attendance with id
router.get("/attendanceRecords/:id", attendanceController.findOne);
 
// Update a attendance with id
router.put("/attendanceRecords/:id", attendanceController.update);
 
// Delete a attendance with id
router.delete("/attendanceRecords/:id", attendanceController.delete);

/* GET attendances listing. */
router.get('/', function(req, res, next) {
  res.send('attendanceRecords');
});

module.exports = router;