const User = require("../models/user.model");
const ErrorHandler = require("../handlers/error.handler");
const Formatter = require("../formatters/models.formatter");

// Create Methods
exports.canCreate = () => {
    return true;
}

exports.tryCreate = (user, res) => {

    if (this.canCreate) {

        try {
            user
            .save()
            .then(data => {
              console.log(`User saved in the database: ${data}`);
              res.json(JSON.stringify(data));
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the User."
              });
            });
            return;
          } catch (error) {
            ErrorHandler.handleError(error, res);
          }
    }
}

// Get Methods
exports.canGet = () => {
    return true;
}

exports.tryGet = (model, filter, populateArgs, res) => {

    if (this.canGet) {

        model.find(filter).populate(populateArgs).then(data =>
        {
            res.json(JSON.stringify(data.map(user => Formatter.formatUser(user))));
        })
        .catch(error => ErrorHandler.handleError(error, res));
    }
}

// Update Methods
exports.canUpdate = () => {
    return true;
}

exports.tryUpdate = (id, updateData, res) => {

    if (this.canUpdate) {

        User.findByIdAndUpdate(id, updateData, {new : true}).then(data => 
        {
            if (data)
            {
                console.log("Updated User : ", data);
                res.json(JSON.stringify(data));
            }
            else
            {
                ErrorHandler.handleError(error, res);
            };
        })
        .catch(error => ErrorHandler.handleError(error, res));
    }
}

// Delete Methods
exports.canDelete = () => {
    return true;
}

exports.tryDelete = (id, res) => {

    if (this.canDelete) {

        User.findByIdAndDelete(id).then(data => 
        {
            if (data) 
            {
                const message = `User deleted: ${data}`;
                res.send({message : message});
            }
            else 
            {
                res.send({message : `Error. No user matches the Id: ${id}`})
            }
        })
        .catch(error => ErrorHandler.handleError(error, res));
    }
}