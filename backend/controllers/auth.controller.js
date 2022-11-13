let Auth = require("../auth/hash");
let UserController = require("../controllers/user.controller");
let User = require("../models/user.model");

exports.login = (req, res) => {
    if (!req.body.Id || !req.body.Password) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    User.findById(req.body.Id).then(data =>
        {
            console.log(data);
            if (data) {
                if (Auth.verifyPassword(req.body.Password, data.Password)) {
                    //to do - generate token
                    res.send({ message: "Login successful" });
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