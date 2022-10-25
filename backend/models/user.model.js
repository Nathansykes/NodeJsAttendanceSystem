module.exports = mongoose => 
{
    var User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          id: String,
          accessLevel: Number,
          firstName: String,
          lastName: String,
        }
      )
    );

    return User;
};