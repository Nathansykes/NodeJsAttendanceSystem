import http from "../http-common";

class AuthenticationDataService {

    login(data) {
        return http.post("/login", data);
    }
}

export default new AuthenticationDataService();