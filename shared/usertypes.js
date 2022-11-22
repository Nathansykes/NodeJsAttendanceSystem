const UserTypes = {
    All: { Id: 0, Name: "Any"},
    Student: { Id: 1, Name: "Student", ModelName: "Student" },
    AcademicAdvisor: { Id: 2, Name: "Academic Advisor", ModelName: "Academic Advisor" },
    Tutor: { Id: 3, Name: "Tutor", ModelName: "Tutor" },
    ModuleLeader: { Id: 4, Name: "Module Leader", ModelName: "ModuleLeader" },
    CourseLeader: { Id: 5, Name: "Course Leader", ModelName: "CourseLeader" },
}

function GetUserTypeById(id) {
    var userType;
    var keys = Object.keys(UserTypes);
    keys.forEach(key => {
        if (UserTypes[key].Id == id) {
            userType = UserTypes[key];
        }
    })
}
function GetUserTypeByModelName(modelName) {
    var userType;
    var keys = Object.keys(UserTypes);
    keys.forEach(key => {
        if (UserTypes[key].ModelName == modelName) {
            userType = UserTypes[key];
        }
    })
}


module.exports = UserTypes;
module.exports.GetUserTypeById = GetUserTypeById;
module.exports.GetUserTypeByModelName = GetUserTypeByModelName;