var express = require('express');
var router = express.Router();
var Auth = require('../authentication')
var UserTypes = require('../../shared/usertypes');

//Require controller
var courseController = require('../controllers/course.controller');
 
// Create a new course
router.post("/courses/", Auth.AllowedUserType(UserTypes.CourseLeader.Id), courseController.create);
 
// Retrieve all courses
router.get("/courses/", courseController.findAll);
 
// Retrieve a single course with id
router.get("/courses/:id", courseController.findOne);
 
// Update a course with id
router.put("/courses/:id", Auth.AllowedUserType(UserTypes.CourseLeader.Id), courseController.update);
 
// Delete a course with id
router.delete("/courses/:id", Auth.AllowedUserType(UserTypes.CourseLeader.Id), courseController.delete);

/* GET courses listing. */
router.get('/', function(req, res, next) {
  res.send('courses');
});

module.exports = router;