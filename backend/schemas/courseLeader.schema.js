var mongoose = require("mongoose");
let Schema =  mongoose.Schema;
let options = require('./user.schema.options');
const User = require("../models/user.model");

let courseLeaderSchema = new Schema(
    {
        Staff: [{type : mongoose.Schema.Types.ObjectId, ref : User.modelName, "default" : [] }],
    }, options);

module.exports = courseLeaderSchema;