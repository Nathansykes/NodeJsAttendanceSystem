import axios from "axios";
import httpCommonDataService from "../services/http-common.data.service";

var http = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${httpCommonDataService.getCookie("access_token")}`
  }
});

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