import http from "../http/http-form-data";
import * as FormData  from 'form-data'

class UploadFileDataService {
    uploadUserFile(file) {
        console.log(file)
        let formData = new FormData();
        formData.append('UserFile', file);
        return http.post("/fileimport/users", formData);
    }
}

export default new UploadFileDataService();