const jwt_decode = require('jwt-decode')

exports.decodeCookie = (cookie) => {
    var decodedCookie = jwt_decode(cookie);
    return decodedCookie;
}

exports.getUserIDFromCookie = (cookie) => {
    var decodedCookie = (decodeCookie(cookie))
    var userId = decodedCookie.Id;
    return userId;
}


