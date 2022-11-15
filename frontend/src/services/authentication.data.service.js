import http from "../http/http-form-encoded";

class AuthenticationDataService {

    login(data) {
        return http.post("/login", data);
    }
}

export default new AuthenticationDataService();