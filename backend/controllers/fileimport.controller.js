const db = require("../models");
var mongoose = require('mongoose');
const User = require("../models/user.model");
const UserController = require("../controllers/user.controller");

const { parse } = require('csv-parse');


exports.importUsers = (req, res) => {


    var file = req.files.UserFile;
    if (!file) {
        res.status(400).send({ message: "File not found!" });
        return;
    }

    try {
        handleFile(file, function (data) {
            var users = data.map(user => UserController.createUser(user, parseInt(user.UserType)));
            users.forEach(user => {
                user.save()
                    .then(data => {
                        console.log('User saved in the database:');
                        console.log(data);
                    });
            });
            console.log(users);
        });
    }
    catch (error) {
        console.log(error);
    }
};


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