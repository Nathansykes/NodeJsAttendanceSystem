import http from "../http-common";

class UserDataService {

    getAll() {
      return http.get("/users");
    }

    get(id) {
        return http.get(`/users/id=${id}`)
    }

    create(data) {
        return http.post("/users", data);
    }

    update(id, data) {
        return http.put(`/users/${id}`, data);
    }

    delete(id) {
        return http.delete(`/users/${id}`);
    }

    findByName(firstName, lastName) {
        return http.get(`/users?firstname=${firstName}&lastname=${lastName}`);
    }  
}

export default new UserDataService();