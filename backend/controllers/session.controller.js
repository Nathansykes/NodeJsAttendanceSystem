const db = require("../models");
var mongoose = require('mongoose');
const Session = require("../models/session.model");
const Formatter = require("../formatters/models.formatter");
 
// Create and Save a new Session
exports.create = (req, res) => {

    // Create a Session model object
    const session = createSession(req.body, res);
    
    console.log(session);
    // Save Session in the database
    try {
        session
        .save()
        .then(data => {
            var successMessage = `Session saved in the database: ${data}`;
            console.log(successMessage);
            res.json(JSON.stringify(data));
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Session."
            });
        });
        return;
    } 
    catch (error) 
    {
        console.log(error);
    }
};

function createSession(body, res)
{
  console.log("trying to create a session");
  var session;

  try 
  {
    var data = {
      _id: mongoose.Types.ObjectId(body.Id),
      Title: body.Title,
      Location: body.Location,
      DateAndTime: new Date(body.DateAndTime),
      Students: body.Students,
      AttendanceRecords: body.AttendanceRecords,
    }
    session = new Session(data);
  }
  catch (error) 
  {
    console.log(error);
    res.send({ message : error.toString()});
  }

  return session;
}

var populateArgs = [{
  path: 'Students',
  model: 'Student',
},
{
  path: 'AttendanceRecords',
  model: 'AttendanceRecord',
}];

// Retrieve all Sessions from the database.
exports.findAll = (req, res) => {

  var filter = {};
  if (req.query.Title){
    filter.Title = req.query.Title;
  }

  Session.find(filter).populate(populateArgs).then(data => 
    {
      res.json(JSON.stringify(data.map(session => Formatter.formatSession(session))));
    });
};
 
// Find a single Session with an id
exports.findOne = (req, res) => {

  const ids = (req.params.id).replace(/ /g, '').split(",");

  Session.find({_id: {$in: ids}}).populate(populateArgs)
  .then(data =>
    {
      res.json(JSON.stringify(data.map(session => Formatter.formatSession(session))));
    })
    .catch(error => 
    {
      res.send({message : error});
    });
};
  
// Update a Session by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;

  var updateData = {
      Title: req.body.Title,
      Location: req.body.Location,
      Students: req.body.Students,
      AttendanceRecords: req.body.AttendanceRecords,
  }

  if (req.body.DateAndTime) 
  {
    try 
    {
      updateData.DateAndTime = new Date(req.body.DateAndTime); 
    }
    catch (error)
    {
      res.send({ message: error });
    }
  }

  Session.findByIdAndUpdate(id, updateData, {new : true}).then(data =>  
    {
        if (data)
        {
            console.log("Updated Session : ", data);
            res.json(JSON.stringify(data));
        }
        else
        {
            console.log(err)
            res.send({message : err});
        };
    });
};

// Delete a Session with the specified id in the request
exports.delete = (req, res) => {

  const id = req.params.id;

  Session.findByIdAndDelete(id).then(data => 
    {
      if (data) 
      {
        const message = `Session deleted: ${data}`;
        console.log(message)
        res.send({message : message});
      }
      else 
      {
          res.send({message : `Error. No session matches the Id: ${id}`})
      }
    });
};