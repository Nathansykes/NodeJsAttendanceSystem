var mongoose = require('mongoose');

//if id is a valid base10 number then convert to ObjectId
//if is not a valid base10 number but is 12 characters long then convert to ObjectId
//if id is null, create a new ObjectId
//else raise error
exports.CreateObjectId = function (id) {
    if(id != null){
        if(!isNaN(parseInt(id))){
            if (id.length > 24) {
                throw "Id is too large. Id must be less than 24 digits.";
            }
            var x = id.toString().padStart(24, '0');
            return mongoose.Types.ObjectId(x);
        }
        else if(id.length == 12){
            return mongoose.Types.ObjectId(id)
        }
        else{
            throw "Id is not a valid number or 12 characters long.";
        }
    }
    else{ 
        return new mongoose.Types.ObjectId();
    }
}
