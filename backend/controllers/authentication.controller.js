let Auth = require("../authentication");
let UserController = require("./user.controller");
let User = require("../models/user.model");

exports.login = async (req, res) => {
    if (!req.body.Id || !req.body.Password) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    var user = await User.findById(req.body.Id.toString().padStart(24, '0'));
    if (user) {
        var result = await Auth.verifyPassword(req.body.Password, user.Password)
        if (result == true) {
            var token = Auth.generateToken(user);
            var response = {
                Token: token,
            }
            res.json(JSON.stringify(response));
        }
        else {
            res.status(401).send({ message: "Incorrect password" });
        }
    }
    else {
        res.status(401).send({ message: "User not found" });
    }
}
exports.verfiyToken = (req, res) => {
    var result = Auth.verifyToken(req);
    res.status(result.Status).send(result.Message);
}