var mongoose = require("mongoose");
let Schema =  mongoose.Schema;
let options = require('./user.schema.options');
const User = require("../models/user.model");

let courseLeaderSchema = new Schema({}, options);

module.exports = courseLeaderSchema;