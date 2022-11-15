const db = require("../models");
var mongoose = require('mongoose');
const Session = require("../models/session.model");
 
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
      Location: body.Location,
      DateAndTime: new Date(body.DateAndTime),
      Students: body.Students,
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
 
// Retrieve all Sessions from the database.
exports.findAll = (req, res) => {
  Session.find().then(data => 
    {
      res.json(JSON.stringify(data));
    });
};
 
// Find a single Session with an id
exports.findOne = (req, res) => {

    const id = req.params.id;
  
    Session.findById(id).then(data =>
    {
      res.json(JSON.stringify(data));
    });
};
  
// Update a Session by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;

  var updateData = {
      Location: req.body.Location,
      DateAndTime: new Date(req.body.DateAndTime),
      Students: req.body.Students,
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