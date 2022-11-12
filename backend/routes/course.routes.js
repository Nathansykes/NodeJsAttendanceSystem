var express = require('express');
var router = express.Router();

//Require controller
var courseController = require('../controllers/course.controller');
 
// Create a new course
router.post("/courses/", courseController.create);
 
// Retrieve all courses
router.get("/courses/", courseController.findAll);
 
// Retrieve a single course with id
router.get("/courses/:id", courseController.findOne);
 
// Update a course with id
router.put("/courses/:id", courseController.update);
 
// Delete a course with id
router.delete("/courses/:id", courseController.delete);

/* GET courses listing. */
router.get('/', function(req, res, next) {
  res.send('courses');
});

module.exports = router;