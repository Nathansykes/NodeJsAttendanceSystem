var mongoose = require('mongoose');

exports.CreateObjectId = function (id) {
    if (isNaN(parseInt(id))) {
        throw "Id is not a valid number.";
    }
    if (id.length > 24) {
        throw "Id is too large. Id must be less than 24 digits.";
    }
    var x = id.toString().padStart(24, '0');
    return mongoose.Types.ObjectId(x);
}
