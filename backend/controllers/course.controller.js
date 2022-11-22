const db = require("../models");
var mongoose = require('mongoose');
const Course = require("../models/course.model");
const ModelFormater = require("../formatters/models.formatter");
 
// Create and Save a new Course
exports.create = (req, res) => {

    // Create a Course model object
    const course = createCourse(req.body, res);
    
    console.log(course);
    // Save Course in the database
    try {
        course
        .save()
        .then(data => {
            var successMessage = `Course saved in the database: ${data}`;
            console.log(successMessage);
            res.json(JSON.stringify(data));
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Course."
            });
        });
        return;
    } 
    catch (error) 
    {
        console.log(error);
    }
};

function createCourse(body, res)
{
  console.log("trying to create a course");
  var course;

  try 
  {
    var data = {
      _id: mongoose.Types.ObjectId(body.Id),
      CourseLeader: body.CourseLeader,
      Title: body.Title,
      Modules : body.Modules,
    }
    course = new Course(data);
  }
  catch (error) 
  {
    console.log(error);
    res.send({ message : error.toString()});
  }

  return course;
}
 
// Retrieve all Courses from the database.
exports.findAll = (req, res) => {
  Course.find().populate({ 
    path: 'Modules',
    populate: {
      path: 'Sessions',
      model: 'Session',
      populate: [{
        path: 'Students',
        model: 'Student',
      },
      {
        path: 'AttendanceRecords',
        model: 'AttendanceRecord',
      }]
    } 
 })
 .then(data => 
  {
    let courses = [];
    data.forEach(course => 
    {
      courses.push(ModelFormater.formatCourse(course));
    });
    res.send(courses);

  });
};
 
// Find a single Course with an id
exports.findOne = (req, res) => {

    const id = req.params.id;
  
    Course.findById(id).then(data =>
    {
      res.json(JSON.stringify(data));
    });
};
  
// Update a Course by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;

  var updateData = {
      CourseLeader: req.body.CourseLeader,
      Title: req.body.Title,
      Modules : req.body.Modules,
  }

  Course.findByIdAndUpdate(id, updateData, {new : true}).then(data =>  
    {
        if (data)
        {
            console.log("Updated Course : ", data);
            res.json(JSON.stringify(data));
        }
        else
        {
            console.log(err)
            res.send({message : err});
        };
    });
};

// Delete a Course with the specified id in the request
exports.delete = (req, res) => {

  const id = req.params.id;

  Course.findByIdAndDelete(id).then(data => 
    {
      if (data) 
      {
        const message = `Course deleted: ${data}`;
        console.log(message)
        res.send({message : message});
      }
      else 
      {
          res.send({message : `Error. No course matches the Id: ${id}`})
      }
    });
};