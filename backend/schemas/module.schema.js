var mongoose = require("mongoose");
let Schema =  mongoose.Schema;
const User = require("../models/user.model");

let moduleSchema = new Schema(
    {
        ModuleLeader : { type : Object },
        Tutors : { type : Array, "default" : [] },
        Groups : { type : Array, "default" : [] },
        Students : { type : Array, "default" : [] }
    });

module.exports = moduleSchema;