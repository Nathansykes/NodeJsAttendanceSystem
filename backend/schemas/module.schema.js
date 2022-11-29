var mongoose = require("mongoose");
let Schema =  mongoose.Schema;
// const ModuleLeader = require("../models/moduleLeader.model");
const Tutor = require("../models/tutor.model");
const Session = require("../models/session.model");

let moduleSchema = new Schema(
    {
        Title : String,
        ModuleLeader : { type : mongoose.Schema.Types.ObjectId, ref : "ModuleLeader", "default" : null },
        Tutors : [{ type : mongoose.Schema.Types.ObjectId, ref : Tutor.modelName, "default" : [] }],
        Sessions : [{ type : mongoose.Schema.Types.ObjectId, ref : Session.modelName, "default" : [] }],
    });

module.exports = moduleSchema;