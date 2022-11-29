const db = require("../models");
const mongoose = require('mongoose');
const User = require("../models/user.model");
const UserController = require("../controllers/user.controller");
const Constants = require("../../shared/constants").Constants;
const UserTypes = require("../../shared/usertypes");
const Generic = require("../generic/functions");
const Auth = require("../authentication");
const ErrorHandler = require("../handlers/error.handler");
const AttendanceRecord = require("../models/attendanceRecord.model");

const { parse } = require('csv-parse');


exports.importAttendance = async (req, res) => {
    var file = req.files?.AttendanceFile;
    if (!file) {
        ErrorHandler.handleError(res, new Error("No file uploaded STATUS_CODE: 400"));
        return;
    }
    try{
        var data = handleFile(file);
        //test the file to make sure data is valid
        var result = validateAttendanceData(data);
        if (!result.IsValid) {
            res.status(400).send({ message: "Invalid data in file.", result: result });
            return;
        }
        var attendanceData = await Promise.all(data.map(async x => ({
            Session: Generic.CreateObjectId(x.Session),
            Student: Generic.CreateObjectId(x.Student),
            Attendance: x.Attendance,
        })));

        var count = 0;
        var result = await AttendanceRecord.insertMany(attendanceData, { ordered: false });
        count = result.length;
        
        res.send({ message: `File uploaded successfully. ${count} attendance records added to the database.` });
    }    
    catch (error) {
        ErrorHandler.handleError(res, error);
    }
}

function validateAttendanceData(fileData) {
    var result = {
        InvalidSessionCount: 0,
        InvalidStudentCount: 0,
        InvalidAttendanceCount: 0,
        IsValid: false,
    };
    fileData.forEach(attendance => {
        if (!attendance.Session) {
            result.InvalidSessionCount++;
        }
        if (!attendance.Student) {
            result.InvalidStudentCount++;
        }
        if (!attendance.Attendance || isNaN(parseInt(attendance.Attendance))) {
            result.InvalidAttendanceCount++;
        }
    });
    result.IsValid = result.InvalidSessionCount == 0
        && result.InvalidStudentCount == 0
        && result.InvalidAttendanceCount == 0;
    return result;
}


exports.importUsers = async (req, res) => {
    var file = req.files?.UserFile;
    if (!file) {
        ErrorHandler.handleError(res, new Error("No file uploaded STATUS_CODE: 400"));
        return;
    }

    try {
        var data = handleFile(file)
        //test the file to make sure data is valid
        var result = validateUserData(data);        
        if (!result.IsValid) {
            res.status(400).send({ message: "Invalid data in file.", result: result });
            return;
        }
        var userData = await Promise.all(data.map(async x => ({
                _id: Generic.CreateObjectId(x.Id),
                UserType: x.UserType,
                FirstName: x.FirstName,
                LastName: x.LastName,
                Password: await Auth.createHash(await x.Password),
        })));
        var users = await Promise.all(userData.map(async x => await UserController.createUser(x, parseInt(x.UserType))));
        try{
            var promises = users.map(async user => await saveDocument(user));
            var savedUsers = await Promise.all(promises);//save all users asynchronously
        }
        catch (error) {
            if (error.code == 11000) {
                res.status(400).send({ message: `Duplicate Keys Encountered, ${savedUsers?.length ?? 0}/${users?.length ?? 0} users saved in database`, SavedUsers: savedUsers });
                return;
            }
            else {
                throw error;// let the default error handler handle it
            }
        }
        
        res.send({ message: `File uploaded successfully. ${savedUsers.length} users added to the database.` });
            
    }
    catch (error) {
        ErrorHandler.handleError(res, error);
    }
};

// async save multiple documents whilst working with different models
function saveDocument(doc){
    return new Promise((resolve, reject) => {
        doc.save((err, doc) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(doc);
            }
        });
    });
}

function validateUserData(fileData) {
    var result = {
        InvalidIdCount: 0,
        MissingFirstNameCount: 0,
        MissingLastNameCount: 0,
        InvalidPasswordCount: 0,
        InvalidUserTypeCount: 0,
        IsValid: false,
    };
    fileData.forEach(user => {
        if (!user.Id || isNaN(parseInt(user.Id))) {
            result.InvalidIdCount++;
        }
        if (!user.FirstName) {
            result.MissingFirstNameCount++;
        }
        if (!user.LastName) {
            result.MissingLastNameCount++;
        }
        if (!user.Password /*|| Constants.PasswordRegex.test(user.Password)*/) {
            result.InvalidPasswordCount++;
        }
        if ((!user.UserType) || (!Object.values(UserTypes).map(x => x.Id).includes(parseInt(user.UserType)))) {
            result.InvalidUserTypeCount++;
        }
    });
    result.IsValid = result.InvalidIdCount == 0
        && result.MissingFirstNameCount == 0
        && result.MissingLastNameCount == 0
        && result.InvalidPasswordCount == 0
        && result.InvalidUserTypeCount == 0;
    return result;
}


function handleFile(file) {
    try {
        var str = file.data.toString('utf8');
        var rows = str.split('\r\n');
        var headers = rows[0].split(',');
        var data = [];
        for (var i = 1; i < rows.length; i++) {
            var row = rows[i].split(',');
            var obj = {};
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = row[j];
            }
            data.push(obj);
        }
        return data;
    }
    catch (error) {
        throw error;
    }
}