var mongoose = require("mongoose");
let Schema =  mongoose.Schema;
let options = require('./user.schema.options');
let Student = require('../models/student.model');

let advisorSchema = new Schema(
    {
        Students: [{type: mongoose.Schema.Types.ObjectId, ref : Student.modelName, "default" : []}],
    }, options);

module.exports = advisorSchema;