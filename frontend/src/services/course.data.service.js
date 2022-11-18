import http from "../http-common";

class CourseDataService {

    getAll() {
        return http.get("/courses");
    }

    get(id) {
        return http.get(`/courses/id=${id}`)
    }

    login(data) {
        return http.post("/login", data);
    }

    create(data) {
        return http.post("/courses", data);
    }

    update(id, data) {
        return http.put(`/courses/${id}`, data);
    }

    delete(id) {
        return http.delete(`/courses/${id}`);
    }

    findByName(title) {
        return http.get("/courses", {params : { Title: title}});
    }  
}

export default new CourseDataService();