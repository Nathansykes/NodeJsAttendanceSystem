
var mongoose = require("mongoose");
let Schema =  mongoose.Schema;
let options = require('./user.schema.options');
const Module = require('../models/module.model');

let moduleLeaderSchema = new Schema(
    {
        Modules: [{type : mongoose.Schema.Types.ObjectId, ref : Module.modelName, "default" : [] }],
    }, options);

module.exports = moduleLeaderSchema;