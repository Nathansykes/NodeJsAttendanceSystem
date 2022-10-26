var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    Id: String,
    AccessLevel: Number,
    FirstName: String,
    LastName: String,    
  },
  {
    discriminatorKey: 'userType'
  }
)

module.exports = mongoose => 
{
    var User = mongoose.model(
      "User",
      userSchema
    );

    return User;
};