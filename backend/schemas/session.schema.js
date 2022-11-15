var mongoose = require("mongoose");
let Schema =  mongoose.Schema;
let Student = require('../models/student.model');

let sessionSchema = new Schema(
    {
        Students : [{ type : mongoose.Schema.Types.ObjectId, ref : Student.modelName, "default" : [] }],
        Location: String,
        DateAndTime: Date
    });

module.exports = sessionSchema;