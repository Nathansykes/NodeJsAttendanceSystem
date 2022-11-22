import http from "../http/http-form-json";

class AttendanceDataService {

    getAll() {
        return http.get("/attendanceRecords");
    }

    get(id) {
        return http.get(`/attendanceRecords/${id}`)
    }

    create(data) {
        return http.post("/attendanceRecords", data);
    }

    update(id, data) {
        return http.put(`/attendanceRecords/${id}`, data);
    }

    delete(id) {
        return http.delete(`/attendanceRecords/${id}`);
    }

    findByName(title) {
        return http.get("/attendanceRecords", {params : { Title: title}});
    }  
}

export default new AttendanceDataService();