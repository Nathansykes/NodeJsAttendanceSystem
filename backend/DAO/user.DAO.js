const User = require("../models/user.model");
const ErrorHandler = require("../handlers/error.handler");
const Formatter = require("../formatters/models.formatter");

// Create Methods
exports.canCreate = () => {
    return true;
}

exports.tryCreate = async (user) => {

    if (this.canCreate) {
        data = await user.save(user);
        console.log(`User saved in the database: ${data}`);
        if (data) {
            return data;
        }
        else{
            throw new Error("Some error occurred while creating the User.");
        }
    }
    else{
        throw new Error("Unable to create the user.");
    }
}

// Get Methods
exports.canGet = () => {
    return true;
}

exports.tryGet = async (model, filter, populateArgs) => {

    if (this.canGet) {
        var data = await model.find(filter).populate(populateArgs)

        if(data){
            return data.map(user => Formatter.formatUser(user))
        }
        else{
            throw new Error("Some error occurred while retrieving users.");
        }
    }
}

// Update Methods
exports.canUpdate = () => {
    return true;
}

exports.tryUpdate = async (id, updateData) => {

    if (this.canUpdate) {
        data = await User.findByIdAndUpdate(id, updateData, {new : true})
        console.log("Updated User : ", data);
        return data;
    }
    else{
        throw new Error("Unable to update the user.");
    }
}

// Delete Methods
exports.canDelete = () => {
    return true;
}

exports.tryDelete = async (id) => {

    if (this.canDelete) {

        var data = await User.findByIdAndDelete(id)
        if (data) 
        {
            return data;
        }
        else 
        {
            throw new Error(`No user matches the Id: ${id} STATUS_CODE: 404`);
        }
    }
    else{
        throw new Error("Unable to delete the user.");
    }
}