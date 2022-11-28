const Session = require("../models/session.model");
const ErrorHandler = require("../handlers/error.handler");
const Formatter = require("../formatters/models.formatter");

// Create Methods
exports.canCreate = () => {
    return true;
}

exports.tryCreate = (session, res) => {

    if (this.canCreate) {

        try {
            session
              .save()
              .then(data => {
                var successMessage = `Session saved in the database: ${data}`;
                console.log(successMessage);
                res.json(JSON.stringify(data));
              })
              .catch(err => {
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while creating the Session."
                });
              });
            return;
          }
          catch (error) {
            ErrorHandler.handleError(res, error);
          }
    }
}

// Get Methods
exports.canGet = () => {
    return true;
}

exports.tryGet = (filter, populateArgs, res) => {

    if (this.canGet) {

        Session.find(filter).populate(populateArgs).then(data => 
        {
            res.json(JSON.stringify(data.map(session => Formatter.formatSession(session))));
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
        Session.findByIdAndUpdate(id, updateData, { new: true }).then(data => {
            if (data) {
              console.log("Updated Session : ", data);
              res.json(JSON.stringify(data));
            }
            else {
              ErrorHandler.handleError(res, error)
            };
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

        Session.findByIdAndDelete(id).then(data => {
            if (data) {
              const message = `Session deleted: ${data}`;
              res.send({ message: message });
            }
            else {
              res.send({ message: `Error. No session matches the Id: ${id}` })
            }
          })
          .catch(error => ErrorHandler.handleError(res, error));
    }
}