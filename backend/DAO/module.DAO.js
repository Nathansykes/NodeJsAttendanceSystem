const Module = require("../models/module.model");
const ErrorHandler = require("../handlers/error.handler");
const Formatter = require("../formatters/models.formatter");

// Create Methods
exports.canCreate = () => {
    return true;
}

exports.tryCreate = async (module) => {
    if (this.canCreate) {
        var data = await module.save();
        if (data) {
            var successMessage = `Module saved in the database: ${data}`;
            console.log(successMessage);
            return data;
        }
        else {
            throw new Error("Some error occurred while creating the Module.");
        }
    }
    else {
        throw new Error("Unable to create module");
    }
}

// Get Methods
exports.canGet = () => {
    return true;
}

exports.tryGet = async (filter, populateArgs) => {

    if (this.canGet) {
        var data = await Module.find(filter).populate(populateArgs);
        if (data) {
            return data.map(module => Formatter.formatModule(module));
        }
        else {
            throw new Error("No Modules found");
        }
    }
    else {
        throw new Error("Unable to get modules");
    }
}

// Update Methods
exports.canUpdate = () => {
    return true;
}

exports.tryUpdate = async (id, updateData) => {

    if (this.canUpdate) {
        var data = await Module.findByIdAndUpdate(id, updateData, { new: true })
        if (data) {
            console.log("Updated Module : ", data);
            return data;
        }
        else {
            throw new Error(`No session module the Id: ${id}`);
        }
    }
    else {
        throw new Error("Unable to update module");
    }
}

// Delete Methods
exports.canDelete = () => {
    return true;
}

exports.tryDelete = async (id) => {

    if (this.canDelete) {
        var data = await Module.findByIdAndDelete(id)
        if (data) {
            const message = `Module deleted: ${data}`;
            console.log(message);
            return data;
        }
        else {
            throw new Error(`Error. No module matches the Id: ${id}`);
        }
    }
    else {
        throw new Error("Unable to delete module");
    }
}