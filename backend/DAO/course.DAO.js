const Course = require("../models/course.model");
const ErrorHandler = require("../handlers/error.handler");
const Formatter = require("../formatters/models.formatter");

// Create Methods
exports.canCreate = () => {
    return true;
}

exports.tryCreate = async (course) => {

    if (this.canCreate) {
        var data = await course.save();
        if(data){
            var successMessage = `Course saved in the database: ${data}`;
            console.log(successMessage);
            return data;
        }
        else{
            throw new Error("Some error occurred while creating the Course.");            
        }
    }
    else {
        throw new Error("Unable to create course");
    }
}

// Get Methods
exports.canGet = () => {
    return true;
}

exports.tryGet = async (filter, populateArgs) => {

    if (this.canGet) {
        var data = await Course.find(filter).populate(populateArgs)
        if(data) {
            return data.map(course => Formatter.formatCourse(course));
        }
        else{
            throw new Error("No Courses found");
        }
    }
    else {
        throw new Error("Unable to get courses");
    }
}

// Update Methods
exports.canUpdate = () => {
    return true;
}

exports.tryUpdate = async (id, updateData) => {
    if (this.canUpdate) {

        var data = await Course.findByIdAndUpdate(id, updateData, {new : true})         
        if (data) {
            console.log("Updated Course : ", data);
            return data
        }
        else {
            throw new Error(`No course matches the Id: ${id}`);
        }
    }
    else {
        throw new Error("Unable to update course");
    }
}

// Delete Methods
exports.canDelete = () => {
    return true;
}

exports.tryDelete = async (id, res) => {
    if (this.canDelete) {        
    var data = await Course.findByIdAndDelete(id)
        if (data) {
            const message = `Course deleted: ${data}`;
            console.log(message);
            return data;
        }
        else {
            throw new Error(`No course matches the Id: ${id}`);
        }
    }    
    else {
        throw new Error("Unable to delete course");
    }
}