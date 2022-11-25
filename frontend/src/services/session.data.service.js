import http from "../http/http-form-encoded";

class SessionDataService {

    getAll() {
        return http.get("/sessions");
    }

    get(id) {
        return http.get(`/sessions/${id}`);
    }

    //uses the token to get the user's sessions
    getSessionForUser(cookie) {
        return http.get("/sessions/mine", {params : { Cookie: cookie}});
    } 

    create(data) {
        return http.post("/sessions", data);
    }

    update(id, data) {
        return http.put(`/sessions/${id}`, data);
    }

    delete(id) {
        return http.delete(`/sessions/${id}`);
    }

    findByName(title) {
        return http.get("/sessions", {params : { Title: title}});
    }  
}

export default new SessionDataService();