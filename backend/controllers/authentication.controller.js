let Auth = require("../authentication");
let UserController = require("./user.controller");
let User = require("../models/user.model");

exports.login = (req, res) => {
    if (!req.body.Id || !req.body.Password) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    User.findById(req.body.Id).then(data =>
        {
            console.log(data);
            if (data.Password) {
                if (Auth.verifyPassword(req.body.Password, data.Password)) {
                    var token = Auth.generateToken(req.body.Id);
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
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the User."
            });
        });

}
exports.verfiyToken = (req, res) => {
    var result = Auth.verifyToken(req);
    res.status(result.Status).send(result.Message);
}