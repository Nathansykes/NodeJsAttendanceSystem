var mongoose = require("mongoose");
var User = require("./user.model");
var Schema = mongoose.Schema;

var studentSchema = new Schema(
    {

    }
)

module.exports = User.discriminator('Student', studentSchema);