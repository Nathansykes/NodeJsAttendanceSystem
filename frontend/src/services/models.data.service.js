import AuthenticationDataService from "./authentication.data.service";
import UserDataService from "./user.data.service";
import CourseDataService from "./course.data.service";
import ModuleDataService from "./module.data.service";
import SessionDataService from "./session.data.sevice";
import UploadFileDataService from "./uploadfile.data.service";

class ModelDataService 
{
    AuthenticationDataService = AuthenticationDataService;
    UserDataService = UserDataService;
    CourseDataService = CourseDataService;
    ModuleDataService = ModuleDataService;
    SessionDataService = SessionDataService;
    UploadFileDataService = UploadFileDataService;
}

export default new ModelDataService();