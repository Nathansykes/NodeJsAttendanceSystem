const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
var ApplicationUser = require("../../shared/ApplicationUser");

exports.createHash = async (password) => {
    try {
        var salt = await bcrypt.genSalt(10);
        var hash = await bcrypt.hash(password.toString(), salt);
        return hash;
    }
    catch (error) {
        console.log(error);
    }
}

exports.verifyPassword = (password, dbHash) => {
    return bcrypt.compare(password, dbHash);
}

exports.generateToken = (data) => {
    try {
        var applicationUser = new ApplicationUser(
            data._id,
            data.FirstName,
            data.LastName,
            data.UserType
        );
        var token = jwt.sign(applicationUser, '6987beea-c26c-4193-b4d7-a27ed1ee4069'); // to do - use env variables
        return token;
    }
    catch (error) {
        console.log(error);
    }
}

exports.verifyToken = (req) => {
    var response = {
        Status: 0,
        Message: ""
    }
    
    if (requestHasToken(req)) {
        var token = req.headers['authorization'].split(' ')[1];
        if (tokenIsValid(token)) {
            response.Status = 200;
            response.Message = "Token is valid";
            return response;
        }
    }
    response.Status = 401;
    response.Message = "Token invalid or not provided";
    return response;
}

function requestHasToken(req) {
    const authHeader = req.headers['authorization']
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return true;
    }
    return false;
}

function tokenIsValid(token) {
    try {
        var result = jwt.verify(token, '6987beea-c26c-4193-b4d7-a27ed1ee4069');
        if (result) {
            return true;
        }
    }
    catch (error) {
        return false
    }
}

exports.GetApplicationUser = (token) => {
    var result = jwt.verify(token, '6987beea-c26c-4193-b4d7-a27ed1ee4069');
    if (result) {
        return result;
    }
    return null;
}