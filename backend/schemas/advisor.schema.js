var mongoose = require("mongoose");
let Schema =  mongoose.Schema;
let options = require('./user.schema.options');
let Student = require('../models/student.model');

let advisorSchema = new Schema(
    {
        Student: {type: mongoose.Schema.Types.ObjectId, ref : Student.modelName}
    }, options);

module.exports = advisorSchema;