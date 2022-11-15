const db = require("../models");
var mongoose = require('mongoose');
const Session = require("../models/session.model");

exports.create = (req, res) => {
    console.log("1st Breakpoint")
    if (!req.body.Location) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    else if (!req.body.Time) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }

    // Create a Session model object
    const session = createSession(req.body, res);
    
    console.log(session);
    // Save Module in the database
    try {
    session
    .save()
    .then(data => {
        var successMessage = `Session saved in the database: ${data}`;
        console.log(successMessage);
        res.send({ message: successMessage });
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
  try 
  {
    var session = {
      //_id: mongoose.Types.ObjectId(body.Id),
      Students: body.Students,
      Location: body.Location,
      DateAndTime: body.DateAndTime,
    }
  }
  catch (error) 
  {
    console.log(error);
    res.send({ message : error.toString()});
  }

  return session;
}

// Retrieve all Sessions from the database.
exports.findAll = (req, res) => {
    Session.find().then(data => 
      {
        res.json(JSON.stringify(data));
      });
  };
   
  // Find a single Session with an id
  exports.findOne = (req, res) => {
  
    const urlParams = new URLSearchParams(req.url);
    const id = urlParams.get('/sessions/id');
  
    Session.findOne({ Id : id }).then(data => 
      {
        res.json(JSON.stringify(data));
      })
  };
   
  // Update a Session by the id in the request
  exports.update = (req, res) => {
   
  };
   
  // Delete a Session with the specified id in the request
  exports.delete = (req, res) => {
   
  };
