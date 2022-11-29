import http from "../http/http-form-encoded";

class AuthenticationDataService {

    login(data) {
        return http.post("/login", data);
    }

    verifyToken() {
        return http.post("/verifyToken");
    }
}

export default new AuthenticationDataService();