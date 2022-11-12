var mongoose = require("mongoose");
let Schema =  mongoose.Schema;
const CourseLeader = require("../models/courseLeader.model");
const Student = require("../models/student.model");
const User = require("../models/user.model");
const Module = require("../models/module.model");

let courseSchema = new Schema(
    {
        Title : String,
        CourseLeader : { type : mongoose.Schema.Types.ObjectId, ref : CourseLeader.modelName, "default" : null },
        Modules : [{ type : mongoose.Schema.Types.ObjectId, ref : Module.modelName, "default" : [] }],
    });

module.exports = courseSchema;