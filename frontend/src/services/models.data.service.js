import AuthenticationDataService from "./authentication.data.service";
import UserDataService from "./user.data.service";
import CourseDataService from "./course.data.service";
import ModuleDataService from "./module.data.service";
import SessionDataService from "./session.data.service";
import UploadFileDataService from "./uploadfile.data.service";
import AttendanceDataService from "./attendance.data.service";
import ErrorHandlerService from "./error.handler.service";
import HTTPCommonDataService from "./http-common.data.service";

class ModelDataService 
{
    AuthenticationDataService = AuthenticationDataService;
    UserDataService = UserDataService;
    CourseDataService = CourseDataService;
    ModuleDataService = ModuleDataService;
    SessionDataService = SessionDataService;
    UploadFileDataService = UploadFileDataService;
    AttendanceDataService = AttendanceDataService;
    ErrorHandlerService = ErrorHandlerService;
    HTTPCommonDataService = HTTPCommonDataService;
}

export default new ModelDataService();