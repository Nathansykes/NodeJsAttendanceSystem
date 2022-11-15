import http from "../http-common";

class UserDataService {
    uploadUserFile(file) {
        return http.post("/fileimport/users", { FileList: file });
    }
}

export default new UserDataService();