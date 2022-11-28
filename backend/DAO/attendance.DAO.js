const Attendance = require("../models/attendanceRecord.model");
const ErrorHandler = require("../handlers/error.handler");
const Formatter = require("../formatters/models.formatter");

// Create Methods
exports.canCreate = () => {
    return true;
}

exports.tryCreate = (attendance, res) => {

    if (this.canCreate) {

        Attendance.insertMany(attendance)
        .then(data => {
            var successMessage = `Attendance saved in the database: ${data}`;
            console.log(successMessage);
            res.json(JSON.stringify(data));
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Attendance."
            });
        });
    }
}

// Get Methods
exports.canGet = () => {
    return true;
}

exports.tryGet = (filter, populateArgs, res) => {

    if (this.canGet) {

        Attendance.findOne(filter).then(data =>
        {
            res.json(JSON.stringify(data));
        })
        .catch(error => ErrorHandler.handleError(res, error));
    }
}

// Update Methods
exports.canUpdate = () => {
    return true;
}

exports.tryUpdate = (id, updateData, res) => {

    if (this.canUpdate) {

        Attendance.findByIdAndUpdate(id, updateData, {new : true}).then(data =>  
        {
            console.log("Updated AttendanceRecord : ", data);
            res.json(JSON.stringify(data));
        })
        .catch(error => ErrorHandler.handleError(res, error));
    }
}

// Delete Methods
exports.canDelete = () => {
    return true;
}

exports.tryDelete = (id, res) => {

    if (this.canDelete) {

        Attendance.findByIdAndDelete(id).then(data => 
        {
            if (data) 
            {
                const message = `AttendanceRecord deleted: ${data}`;
                res.send({message : message});
            }
            else 
            {
                res.send({message : `Error. No attendancerecord matches the Id: ${id}`})
            }
        })
        .catch(error => ErrorHandler.handleError(res, error));
    }
}