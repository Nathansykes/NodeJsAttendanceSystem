const Attendance = require("../models/attendanceRecord.model");
const ErrorHandler = require("../handlers/error.handler");
const Formatter = require("../formatters/models.formatter");

// Create Methods
exports.canCreate = () => {
    return true;
}

exports.tryCreate = async (attendance) => {
    if (this.canCreate) {
        var data = await Attendance.insertMany(attendance)
        if(data) {
            var successMessage = `Attendance saved in the database: ${data}`;
            console.log(successMessage);
            return data;
        }
        else { 
            throw new Error("Some error occurred while creating the Attendance.");            
        }        
    }
    else {
        throw new Error("Unable to create attendance");
    }
}

// Get Methods
exports.canGet = () => {
    return true;
}

exports.tryGet = async (filter, populateArgs, res) => {
    if (this.canGet) {
        var data = await Attendance.findOne(filter)
        if (data) {
            return data;
        }
        else{
            throw new Error("No Attendance found");
        }
    }
    else{
        throw new Error("Unable to get attendance");
    }
}

// Update Methods
exports.canUpdate = () => {
    return true;
}

exports.tryUpdate = async (id, updateData) => {
    if (this.canUpdate) {
        var data = await Attendance.findByIdAndUpdate(id, updateData, {new : true})
        if(data) {
            console.log("Updated AttendanceRecord : ", data);
            return data;
        }
        else {
            throw new Error(`Error. No attendancerecord matches the Id: ${id}`);
        }
    }
    else {
        throw new Error("Unable to update attendance");
    }
}

// Delete Methods
exports.canDelete = () => {
    return true;
}

exports.tryDelete = async (id, res) => {

    if (this.canDelete) {

        var data = await Attendance.findByIdAndDelete(id)
        if (data) {
            const message = `AttendanceRecord deleted: ${data}`;
            console.log(message);
            return data;
        }
        else {
            throw new Error(`Error. No attendancerecord matches the Id: ${id}`);
        }
    }
    else {
        throw new Error("Unable to delete attendance");
    }
}