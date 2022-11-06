var express = require('express');
var router = express.Router();

//Require controller
var attendanceController = require('../controllers/attendanceRecord.controller');
 
// Create a new attendance
router.post("/attendances/", attendanceController.create);
 
// Retrieve all attendances
router.get("/attendances/", attendanceController.findAll);
 
// Retrieve a single attendance with id
router.get("/attendances/:id", attendanceController.findOne);
 
// Update a attendance with id
router.put("/attendances/:id", attendanceController.update);
 
// Delete a attendance with id
router.delete("/attendances/:id", attendanceController.delete);

/* GET attendances listing. */
router.get('/', function(req, res, next) {
  res.send('attendances');
});

module.exports = router;