const db = require("../models");
var mongoose = require('mongoose');
const User = require("../models/user.model");
const UserController = require("../controllers/user.controller");
const Constants = require("../../shared/constants").Constants;
const UserTypes = require("../../shared/usertypes");
const Generic = require("../generic/functions");

const { parse } = require('csv-parse');


exports.importUsers = (req, res) => {
    var file = req.files?.UserFile;
    if (!file) {
        res.status(400).send({ message: "File not found!" });
        return;
    }

    try {
        handleFile(file, async function (data) {
            //test the file to make sure data is valid
            var result = validateUserData(data);
            try {
                if (!result.IsValid) {
                    res.status(400).send({ message: "Invalid data in file.", result: result });
                    return;
                }
                var userData = data.map(x => ({
                        _id: Generic.CreateObjectId(x.Id),
                        UserType: x.UserType,
                        FirstName: x.FirstName,
                        LastName: x.LastName,
                        Password: x.Password,
                }));
                var users = await Promise.all(userData.map(async x => await UserController.createUser(x, parseInt(x.UserType))));
                var count = 0;
                users.forEach(user => {
                    user.save()
                        .then(data => {
                        });
                    count++;
                });
                res.send({ message: `File uploaded successfully. ${count} users added to the database.` });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    catch (error) {
        console.log(error);
    }
};
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


function handleFile(file, output) {
    try {
        parse(file.data, { columns: true }, function (err, data) {
            output(data);
        });
    }
    catch (error) {
        console.log(error);
    }
}