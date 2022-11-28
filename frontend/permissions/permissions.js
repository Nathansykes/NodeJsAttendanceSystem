import { actions, roles } from "../constants";

const mappings = new Map();

mappings.set(actions.UPLOAD_FILE, []);
mappings.set(actions.VIEW_REPORT, []);
mappings.set(actions.MARK_ATTENDANCE, []);
mappings.set(actions.VIEW_TIMETABLE, [roles.STUDENT, roles.TUTOR]);

function hasPermission(usertype, action) {
    if (usertype == null || usertype == "") {
      return false;
    }
  
    if (mappings.has(action)) {
      return mappings.get(action).includes(usertype);
    }
  
    return false;
  }

  export default hasPermission;