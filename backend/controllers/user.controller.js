const User = require("../models/user.model");
const Student = require("../models/student.model");
const AcademicAdvisor = require("../models/advisor.model");
const ModuleLeader = require("../models/moduleLeader.model");
const CourseLeader = require("../models/courseLeader.model");
const Tutor = require("../models/tutor.model");
const Auth = require("../authentication/");
const UserTypes = require("../../shared/usertypes");
const Generic = require("../generic/functions");
const ErrorHandler = require("../handlers/error.handler");
const UserDAO = require("../DAO/user.DAO");

// Create and Save a new User
exports.create = async (req, res) => {
    if (!req.body.FirstName) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }

      // Create a User model object
      const user = await createUserFromBody(req.body, res);

      UserDAO.tryCreate(user, res);
};

async function createUserFromBody(body, res) {
  var user;
  var passwordHash = await Auth.createHash(body.Password);
  try 
  {
    var data = {
      _id: Generic.CreateObjectId(body.Id),
      AccessLevel: body.AccessLevel,
      FirstName: body.FirstName,
      LastName: body.LastName,
      Password: passwordHash,
    }
  }
  catch (error) {
    ErrorHandler.handleError(res, error);
  }

  if (body.UserType) {
    var userType = parseInt(body.UserType);
  } // check userType is able to be parsed

  return await createUser(data, userType);
}

async function createUser(data, userType)
{
  var errorMessage = `User could not be created: ${userType} is not a valid UserType.`;

  var user;
  try {
    switch (userType) {
      case UserTypes.Student.Id:
        user = new Student(data);
        break;
      case UserTypes.AcademicAdvisor.Id:
        user = new AcademicAdvisor(data);
        break;
      case UserTypes.ModuleLeader.Id:
        user = new ModuleLeader(data);
        break;
      case UserTypes.CourseLeader.Id:
        user = new CourseLeader(data);
        break;
      case UserTypes.Tutor.Id:
        user = new Tutor(data);
        break;
      default:
        throw errorMessage;
    }
  }
  catch (error) {
    ErrorHandler.handleError(res, error);
  }
  return user;
}
exports.createUser = createUser;

// Find all users matching query
exports.find = (req, res) =>
{
  var filter = {};
  if (req.query.firstname){
    filter.FirstName = req.query.firstname;
  }
  if (req.query.lastname){
    filter.LastName = req.query.lastname;
  }
  if(req.query.UserType){
    var userType = parseInt(req.query.UserType);
  }
  
  switch(userType)
  {
    case UserTypes.Student.Id:
      UserDAO.tryGet(Student, filter, null, res);
      break;
    case UserTypes.Tutor.Id:
      UserDAO.tryGet(Tutor, filter, null, res);
      break;
    case UserTypes.AcademicAdvisor.Id:
      UserDAO.tryGet(AcademicAdvisor, filter, null, res);
      break;
    case UserTypes.CourseLeader.Id:
      UserDAO.tryGet(CourseLeader, filter, null, res);
      break;
    case UserTypes.ModuleLeader.Id:
      UserDAO.tryGet(ModuleLeader, filter, null, res);
      break;
    case UserTypes.All.Id:
    case undefined:
    case null:
      UserDAO.tryGet(User, filter, null, res);
      break;
    default:
      res.status(400).send("UserType is not valid.");
      break;
  }
};

// Find a single User with an id
exports.findOne = (req, res) => {

  const id = req.params.id.toString().padStart(24, '0');

  if(req.query.UserType){
    var userType = parseInt(req.query.UserType);
  }

  switch(userType)
  {
    case UserTypes.Student.Id:
      UserDAO.tryGet(Student, { _id : id}, null, res);
      break;
    case UserTypes.Tutor.Id:
      UserDAO.tryGet(Tutor, { _id : id}, null, res);
      break;
      case UserTypes.AcademicAdvisor.Id:
      UserDAO.tryGet(AcademicAdvisor, { _id : id}, { path : 'Students' }, res);
      break;
      case UserTypes.CourseLeader.Id:
      UserDAO.tryGet(CourseLeader, { _id : id}, null, res);
      break;
      case UserTypes.ModuleLeader.Id:
      UserDAO.tryGet(ModuleLeader, { _id : id}, null, res);
      break;
    case UserTypes.All.Id:
    case undefined:
    case null:
      UserDAO.tryGet(User, { _id : id}, null, res);
      break;
    default:
      res.status(400).send("UserType is not valid.");
      break;
  }
};


// Update a User by the id in the request
exports.update = (req, res) => {

  const id = req.params.id.toString().padStart(24, '0');
  
  var updateData = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
  }
  
  UserDAO.tryUpdate(id, updateData, res)
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  
  const id = req.params.id.toString().padStart(24, '0');

  UserDAO.tryDelete(id, res);
};