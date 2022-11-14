let Auth = require("../auth");
let UserController = require("../controllers/user.controller");

exports.login = (req, res) => {
    if (!req.body.Email || !req.body.Password) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    UserController.findOne(req.body.Email)
        .then(data => {
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