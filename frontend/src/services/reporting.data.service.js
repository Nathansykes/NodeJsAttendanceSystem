import http from "../http/http-form-encoded";
import jsonHttp from "../http/http-form-json";

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

    getAdvisorReport(advisorId) {
        return http.get(`/reporting/advisor`, { params: { AdvisorId: advisorId } });
    }

    downloadReport(report) {
        return jsonHttp.post(`/reporting/download`, report);
    }
}

export default new ReportingDataService();