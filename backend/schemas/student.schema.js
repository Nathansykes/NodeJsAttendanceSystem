var mongoose = require("mongoose");
let Schema =  mongoose.Schema;
let options = require('./user.schema.options');

let studentSchema = new Schema({}, options);

module.exports = studentSchema;