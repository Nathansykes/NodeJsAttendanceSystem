var mongoose = require("mongoose");
var User = require("./user.model");
// var Schema = mongoose.Schema;

module.exports = mongoose => 
{
    var Student = User();

    return Student;
};


// var studentSchema = new Schema(
//     {

//     }
// )

// module.exports = User.discriminator('Student', studentSchema);