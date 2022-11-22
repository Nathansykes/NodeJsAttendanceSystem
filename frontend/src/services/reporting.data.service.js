import http from "../http/http-form-encoded";

class ReportingDataService {

    getStudentReport(studentId, moduleId, courseId) {
        return http.get("/reporting/student", { params: { StudentId: studentId, ModuleId: moduleId, CourseId: courseId } });
    }

    getModuleReport(moduleId) {
        return http.get(`/reporting/module`, { params: { ModuleId: moduleId } });
    }

    getCourseReport(courseId) {
        return http.get(`/reporting/course`, { params: { CourseId: courseId } });
    }
}

export default new ReportingDataService();