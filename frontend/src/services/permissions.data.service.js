import { actions, roles } from "../../constants";


const mappings = new Map();

mappings.set(actions.UPLOAD_FILE, [roles.COURSE_LEADER]);
mappings.set(actions.VIEW_REPORT, [roles.ACADEMIC_ADVISOR, roles.TUTOR, roles.COURSE_LEADER, roles.MODULE_LEADER, roles.STUDENT]);
mappings.set(actions.VIEW_TIMETABLE, [roles.STUDENT, roles.TUTOR]);
mappings.set(actions.VIEW_ADVISOR_VIEW, [roles.ACADEMIC_ADVISOR]);
mappings.set(actions.EDIT_COURSE, [roles.COURSE_LEADER]);
mappings.set(actions.EDIT_MODULE, [roles.COURSE_LEADER]);
mappings.set(actions.EDIT_SESSION, [roles.COURSE_LEADER, roles.MODULE_LEADER]);
mappings.set(actions.ADD_STUDENT_TO_SESSION, [roles.COURSE_LEADER, roles.MODULE_LEADER, roles.TUTOR])

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