const bcrypt = require("bcrypt")

exports.createHash = async (password) => {
    try {
        var salt = bcrypt.genSalt(10);
        var hash = await bcrypt.hash(password, salt);
        return hash;
    }
    catch (error) {
        console.log(error);
    }
}

exports.verifyPassword = (password, dbHash) => {
    let passwordFields = dbHash.split('$');
    let salt = passwordFields[0];
    let hash = crypto.createHmac('sha512', salt)
        .update(password)
        .digest("base64");
    return hash === passwordFields[1];
}