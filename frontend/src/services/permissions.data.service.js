import { actions, roles } from "../../constants";


const mappings = new Map();

mappings.set(actions.UPLOAD_FILE, []);
mappings.set(actions.VIEW_REPORT, []);
mappings.set(actions.MARK_ATTENDANCE, []);
mappings.set(actions.VIEW_TIMETABLE, [roles.STUDENT, roles.TUTOR]);
mappings.set(actions.VIEW_ADVISORS_STUDENTS, [roles.ACADEMIC_ADVISOR]);

class permissionsService{
    hasPermission(userTypeId, action) {
        switch (userTypeId)
        {
          case 1:
            userTypeId = roles.STUDENT;
            break;
          case 2:
            userTypeId = roles.ACADEMIC_ADVISOR;
            break;
          case 3:
            userTypeId = roles.TUTOR;
            break;
          case 4:
            userTypeId = roles.MODULE_LEADER;
            break;
          case 5:
            userTypeId = roles.COURSE_LEADER;
            break;
          default:
            userTypeId = null;
        }
    
        if (userTypeId == null) {
          return false;
        }
      
        if (mappings.has(action)) {
          return mappings.get(action).includes(userTypeId);
        }
      
        return false;
      }
    
}

export default new permissionsService();