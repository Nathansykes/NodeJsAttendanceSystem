var mongoose = require("mongoose");


module.exports = mongoose => 
{
    var User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          Id: String,
          AccessLevel: Number,
          FirstName: String,
          LastName: String,
        },
        {
          discriminatorKey: "userType",
        }
      )
    );

    return User;
};

// var userSchema = mongoose.Schema(
//   {
//     Id: String,
//     AccessLevel: Number,
//     FirstName: String,
//     LastName: String,    
//   },
//   {
//     discriminatorKey: 'userType'
//   }
// )

// module.exports = mongoose.model(
//   "user",
//   userSchema
// );

// module.exports = mongoose => 
// {
//     var User = mongoose.model(
//       "User",
//       userSchema
//     );

//     return User;
// };