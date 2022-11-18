import http from "../http-common";

class ModuleDataService {

    getAll() {
        return http.get("/modules");
    }

    get(id) {
        return http.get(`/modules/${id}`);
    }

    login(data) {
        return http.post("/login", data);
    }

    create(data) {
        return http.post("/modules", data);
    }

    update(id, data) {
        return http.put(`/modules/${id}`, data);
    }

    delete(id) {
        return http.delete(`/modules/${id}`);
    }

    findByName(title) {
        return http.get("/modules", {params : { Title: title}});
    }  
}

export default new ModuleDataService();