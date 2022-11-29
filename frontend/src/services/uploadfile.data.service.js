import http from "../http/http-form-data";
import * as FormData  from 'form-data'

class UploadFileDataService {
    uploadUserFile(file) {
        let formData = new FormData();
        formData.append('UserFile', file);
        return http.post("/fileimport/users", formData);
    }
    uploadAttendanceFile(file) {
        let formData = new FormData();
        formData.append('AttendanceFile', file);
        return http.post("/fileimport/attendance", formData);
    }
}

export default new UploadFileDataService();