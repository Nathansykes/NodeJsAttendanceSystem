const User = require("../models/user.model");
const ErrorHandler = require("../handlers/error.handler");
const Formatter = require("../formatters/models.formatter");
const mongoose = require('mongoose');
const Student = require("../models/student.model");
const AcademicAdvisor = require("../models/advisor.model");
const ModuleLeader = require("../models/moduleLeader.model");
const CourseLeader = require("../models/courseLeader.model");
const Tutor = require("../models/tutor.model");
const UserTypes = require("../../shared/usertypes");

// Create Methods
exports.canCreate = (userData) => {
    return userData != null
        && userData.Password != null
        && userData.LastName != null
        && userData.FirstName != null;
}

exports.createUser = async (data, userType) => {
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

exports.tryCreate = async (userData, userType) => {
    if (this.canCreate(userData)) {
        var user = await this.createUser(userData, userType);

        data = await user.save(user);
        console.log(`User saved in the database: ${data}`);
        if (data) {
            return data;
        }
        else {
            throw new Error("Some error occurred while creating the User.");
        }
    }
    else {
        throw new Error("Unable to create the user.");
    }
}

// Get Methods
exports.canGet = () => {
    return true;
}

exports.tryGet = async (model, filter, populateArgs) => {

    if (this.canGet) {
        var data = await model.find(filter).populate(populateArgs)

        if (data) {
            return data.map(user => Formatter.formatUser(user))
        }
        else {
            throw new Error("Some error occurred while retrieving users.");
        }
    }
}

// Update Methods
exports.canUpdate = () => {
    return true;
}

exports.tryUpdate = async (id, updateData) => {

    if (this.canUpdate) {
        data = await User.findByIdAndUpdate(id, updateData, { new: true })
        console.log("Updated User : ", data);
        return data;
    }
    else {
        throw new Error("Unable to update the user.");
    }
}

exports.tryAddToArrayField = async (id, field, items) => {
    if (this.canUpdate) {
        var dataToUpdate = await User.findOne({ _id: id });
        items.forEach(item => {
            dataToUpdate[field].push(item);
        });
        var updatedData = await dataToUpdate.save();
        return updatedData;
    }
}

// Delete Methods
exports.canDelete = () => {
    return true;
}

exports.tryDelete = async (id) => {

    if (this.canDelete) {

        var data = await User.findByIdAndDelete(id)
        if (data) {
            return data;
        }
        else {
            throw new Error(`No user matches the Id: ${id} STATUS_CODE: 404`);
        }
    }
    else {
        throw new Error("Unable to delete the user.");
    }
}