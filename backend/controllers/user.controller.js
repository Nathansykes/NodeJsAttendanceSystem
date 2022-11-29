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

  try {
    var data = await UserDAO.tryCreate(user);
    res.json(JSON.stringify(data));
  }
  catch (error) {
    ErrorHandler.handleError(res, error);
  }
};

async function createUserFromBody(body, res) {
  var passwordHash = await Auth.createHash(body.Password);
  try {
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
    return;
  }

  if (body.UserType) {
    var userType = parseInt(body.UserType);
  } // check userType is able to be parsed

  try {
    var user = await createUser(data, userType);
    return user;
  }
  catch (error) {
    ErrorHandler.handleError(res, error);
  }
}

async function createUser(data, userType) {
  var errorMessage = `User could not be created: ${userType} is not a valid UserType.`;
  var user;
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
      throw new Error(errorMessage);
  }
  return user;
}
exports.createUser = createUser;

// Find all users matching query
exports.find = async (req, res) => {
  var filter = {};
  if (req.query.firstname) {
    filter.FirstName = req.query.firstname;
  }
  if (req.query.lastname) {
    filter.LastName = req.query.lastname;
  }
  if (req.query.UserType) {
    var userType = parseInt(req.query.UserType);
  }

  try {
    var returnedData;
    switch (userType) {
      case UserTypes.Student.Id:
        returnedData = await UserDAO.tryGet(Student, filter, null);
        break;
      case UserTypes.Tutor.Id:
        returnedData = await UserDAO.tryGet(Tutor, filter, null);
        break;
      case UserTypes.AcademicAdvisor.Id:
        returnedData = await UserDAO.tryGet(AcademicAdvisor, filter, { path : 'Students' });
        break;
      case UserTypes.CourseLeader.Id:
        returnedData = await UserDAO.tryGet(CourseLeader, filter, null);
        break;
      case UserTypes.ModuleLeader.Id:
        returnedData = await UserDAO.tryGet(ModuleLeader, filter, null);
        break;
      case UserTypes.All.Id:
      case undefined:
      case null:
        returnedData = await UserDAO.tryGet(User, filter, null);
        break;
      default:
        res.status(400).send("UserType is not valid.");
        return;
    }
    res.json(JSON.stringify(returnedData));
    return;
  }
  catch (error) {
    ErrorHandler.handleError(res, error);
  }
};

// Find a single User with an id
exports.findOne = async (req, res) => {

  const id = req.params.id.toString().padStart(24, '0');

  if (req.query.UserType) {
    var userType = parseInt(req.query.UserType);
  }

  try {
    switch (userType) {
      case UserTypes.Student.Id:
        returnedData = await UserDAO.tryGet(Student, { _id: id }, null);
        break;
      case UserTypes.Tutor.Id:
        returnedData = await UserDAO.tryGet(Tutor, { _id: id }, null);
        break;
      case UserTypes.AcademicAdvisor.Id:
        returnedData = await UserDAO.tryGet(AcademicAdvisor, { _id: id }, { path : 'Students' });
        break;
      case UserTypes.CourseLeader.Id:
        returnedData = await UserDAO.tryGet(CourseLeader, { _id: id }, null);
        break;
      case UserTypes.ModuleLeader.Id:
        returnedData = await UserDAO.tryGet(ModuleLeader, { _id: id }, null);
        break;
      case UserTypes.All.Id:
      case undefined:
      case null:
        returnedData = await UserDAO.tryGet(User, { _id: id }, null);
        break;
      default:
        res.status(400).send("UserType is not valid.");
        return;
    }
    res.json(JSON.stringify(returnedData[0]));
    return;
  }
  catch (error) {
    ErrorHandler.handleError(res, error);
  }
};


// Update a User by the id in the request
exports.update = async (req, res) => {

  const id = req.params.id.toString().padStart(24, '0');

  var updateData = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
  }

  try{
    var updatedData = await UserDAO.tryUpdate(id, updateData)
    res.json(JSON.stringify(updatedData));
  }
  catch(error){
    ErrorHandler.handleError(res, error);
  }
};

// Delete a User with the specified id in the request
exports.delete = async (req, res) => {

  const id = req.params.id.toString().padStart(24, '0');

  try{
    var deletedData = await UserDAO.tryDelete(id, res);
    res.json(JSON.stringify({Message: "User Deleted", DeletedData: deletedData}));
  }
  catch(error){
    ErrorHandler.handleError(res, error);
  }  
};