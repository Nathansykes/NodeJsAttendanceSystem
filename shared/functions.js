const UserTypes = require("./usertypes");
const AttendanceTypes = require("./attendancetypes");



Object.prototype.GetTypeByPropertyValue = function (property, value) {
    property = property || "Id";
    var keys = Object.keys(this);
    var type;
    keys.forEach(key => {
        if (this[key][property] == value) {
            type = this[key];
        }
    });
    return type;
}

function GetUserTypeById(id) {
    return UserTypes.GetTypeByPropertyValue("Id", id);
}
function GetUserTypeByModelName(modelName) {
    return UserTypes.GetTypeByPropertyValue("ModelName", modelName);
}
function GetAttendanceTypeById(id) {
    return AttendanceTypes.GetTypeByPropertyValue("Id", id);
}
function GetAttendanceTypeByName(name) {
    return AttendanceTypes.GetTypeByPropertyValue("Name", name);
}


module.exports.GetUserTypeById = GetUserTypeById;
module.exports.GetUserTypeByModelName = GetUserTypeByModelName;
module.exports.GetAttendanceTypeById = GetAttendanceTypeById;
module.exports.GetAttendanceTypeByName = GetAttendanceTypeByName;