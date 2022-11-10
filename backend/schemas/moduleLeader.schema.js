
var mongoose = require("mongoose");
let Schema =  mongoose.Schema;
let options = require('./user.schema.options');
let Module = require('../models/module.model');

let moduleLeaderSchema = new Schema(
    {
        Modules : [{type : mongoose.Schema.Types.ObjectId, ref : Module.modelName, "default" : [] }],
    }, options);
