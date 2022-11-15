import http from "../http-common";

class UserDataService {
    uploadUserFile(file) {
        console.log(file)
        return http.post("/fileimport/users", { FileList: file });
    }
}

export default new UserDataService();