
var mongoose = require("mongoose");
let Schema =  mongoose.Schema;
let options = require('./user.schema.options');
let module = require('../models/module.model');

let moduleLeaderSchema = new Schema(
    {
        Module: {type : mongoose.Schema.Types.ObjectId, ref : module.modelName},
    }, options);
