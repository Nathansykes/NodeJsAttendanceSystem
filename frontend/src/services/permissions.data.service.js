import { actions, roles } from "../../constants";


const mappings = new Map();

mappings.set(actions.UPLOAD_FILE, []);
mappings.set(actions.VIEW_REPORT, []);
mappings.set(actions.MARK_ATTENDANCE, []);
mappings.set(actions.VIEW_TIMETABLE, [roles.STUDENT, roles.TUTOR]);

class permissionsService{
    hasPermission(usertype, action) {
        switch (usertype)
        {
          case 1:
            usertype = roles.STUDENT;
            break;
          case 2:
            usertype = roles.ACADEMIC_ADVISOR;
            break;
          case 3:
            usertype = roles.TUTOR;
            break;
          case 4:
            usertype = roles.MODULE_LEADER;
            break;
          case 5:
            usertype = roles.COURSE_LEADER;
            break;
          default:
            usertype = null;
        }
    
        if (usertype == null) {
          console.log("in first if");
          return false;
        }
      
        if (mappings.has(action)) {
          console.log("in second if");
          console.log(mappings.get(action).includes(usertype));
          return mappings.get(action).includes(usertype);
        }
      
        return false;
      }
    
}

export default new permissionsService();