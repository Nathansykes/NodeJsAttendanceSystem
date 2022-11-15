var mongoose = require("mongoose");
let Schema =  mongoose.Schema;
let options = require('./user.schema.options');
let Session = require('../models/session.model')

let tutorSchema = new Schema(
    {
        Sessions: [{type: mongoose.Schema.Types.ObjectId, ref : Session.modelName, "default" : [] }]
    }, options);

module.exports = tutorSchema;