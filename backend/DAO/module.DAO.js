const Module = require("../models/module.model");
const ErrorHandler = require("../handlers/error.handler");
const Formatter = require("../formatters/models.formatter");

// Create Methods
exports.canCreate = () => {
    return true;
}

exports.tryCreate = (module, res) => {

    if (this.canCreate) {

        try {
            module
            .save()
            .then(data => {
                var successMessage = `Module saved in the database: ${data}`;
                console.log(successMessage);
                res.json(JSON.stringify(data));
            })
            .catch(err => {
                res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Module."
                });
            });
            return;
          } 
          catch (error) 
          {
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

        Module.find(filter).populate(populateArgs).then(data =>
        {
            res.json(JSON.stringify(data.map(module => Formatter.formatModule(module))));
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

        Module.findByIdAndUpdate(id, updateData, {new : true}).then(data =>  
        {
            if (data)
            {
                console.log("Updated Module : ", data);
                res.json(JSON.stringify(data));
            }
            else
            {
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

        Module.findByIdAndDelete(id).then(data => 
        {
            if (data) 
            {
            const message = `Module deleted: ${data}`;
            res.send({message : message});
            }
            else 
            {
                res.send({message : `Error. No module matches the Id: ${id}`})
            }
        })
        .catch(error => ErrorHandler.handleError(res, error));
    }
}