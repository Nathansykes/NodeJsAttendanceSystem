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
        }
      )
    );

    return User;
};