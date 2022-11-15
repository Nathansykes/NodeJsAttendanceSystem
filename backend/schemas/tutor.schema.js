var mongoose = require("mongoose");
let Schema =  mongoose.Schema;
let options = require('./user.schema.options');
let Session = require('../models/session.model')

let tutorSchema = new Schema(
    {
        Session: {type: mongoose.Schema.Types.ObjectId, ref : Session.modelName}
    }, options);

module.exports = tutorSchema;