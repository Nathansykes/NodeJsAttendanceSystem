var mongoose = require("mongoose");
let Schema =  mongoose.Schema;
let options = require('./session.schema.options');
let Student = require('../models/student.model');

let sessionSchema = new Schema(
    {
        Student: {type: mongoose.Schema.type.ObjectId, ref: Student.modelName},
        Location: String,
        Time: Date
    });

module.exports = sessionSchema;