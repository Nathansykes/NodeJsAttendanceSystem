var mongoose = require("mongoose");
let Schema =  mongoose.Schema;
const Student = require("../models/student.model");

let moduleSchema = new Schema(
    {
        Title : String,
        ModuleLeader : { type : mongoose.Schema.Types.ObjectId, ref : "ModuleLeader", "default" : null },
        Tutors : [{ type : mongoose.Schema.Types.ObjectId, ref : "Tutor", "default" : [] }],
        Groups : [{ type : mongoose.Schema.Types.ObjectId, ref : "Group", "default" : [] }],
        Students : [{ type : mongoose.Schema.Types.ObjectId, ref : Student.modelName, "default" : [] }],
    });

module.exports = moduleSchema;