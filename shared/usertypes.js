const UserTypes = {
    All: { Id: 0, Name: "Any"},
    Student: { Id: 1, Name: "Student", ModelName: "Student" },
    AcademicAdvisor: { Id: 2, Name: "Academic Advisor", ModelName: "Advisor" },
    Tutor: { Id: 3, Name: "Tutor", ModelName: "Tutor" },
    ModuleLeader: { Id: 4, Name: "Module Leader", ModelName: "ModuleLeader" },
    CourseLeader: { Id: 5, Name: "Course Leader", ModelName: "CourseLeader" },
}
module.exports = UserTypes;
