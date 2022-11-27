const Course = require("../models/course.model");
const ErrorHandler = require("../handlers/error.handler");
const Formatter = require("../formatters/models.formatter");

// Create Methods
exports.canCreate = () => {
    return true;
}

exports.tryCreate = (course, res) => {

    if (this.canCreate) {
        
        try {
            course
            .save()
            .then(data => {
                var successMessage = `Course saved in the database: ${data}`;
                console.log(successMessage);
                res.json(JSON.stringify(data));
            })
            .catch(err => {
                res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Course."
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

exports.tryGet = (id, filter, populateArgs, res) => {

    if (this.canGet) {

        if (id) {
            Course.findById(id).then(data =>
            {
                res.json(JSON.stringify(Formatter.formatCourse(data)));
            })
            .catch(error => ErrorHandler.handleError(res, error));
        }
        else if (filter) {
            Course.find(filter).populate(populateArgs)
            .then(data => 
            {
                res.json(JSON.stringify(data.map(course => Formatter.formatCourse(course))));
            });
        }
    }
}

// Update Methods
exports.canUpdate = () => {
    return true;
}

exports.tryUpdate = (id, updateData, res) => {

    if (this.canUpdate) {

        Course.findByIdAndUpdate(id, updateData, {new : true}).then(data =>  
        {
            if (data)
            {
                console.log("Updated Course : ", data);
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
        
        Course.findByIdAndDelete(id).then(data => 
        {
            if (data) 
            {
            const message = `Course deleted: ${data}`;
            res.send({message : message});
            }
            else 
            {
                res.send({message : `Error. No course matches the Id: ${id}`})
            }
        })
        .catch(error => ErrorHandler.handleError(res, error));
    }
}