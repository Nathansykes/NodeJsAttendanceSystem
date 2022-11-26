class ModelFormatter 
{
    formatCourse(data) 
    {
        return {
            Id: data._id,
            Title: data.Title,
            CourseLeader: data.CourseLeader ?? "n/a",
            Modules : data.Modules.map(module => this.formatModule(module)),
          }
    }
    
    formatModule(data) 
    {    
        return {
            Id: data._id,
            Title: data.Title,
            ModuleLeader: data.ModuleLeader ?? "n/a",
            Sessions : data.Sessions?.map(session => this.formatSession(session)),
        }
    }
    
    formatSession(data) 
    {    
        return {
            Id: data._id,
            Title: data.Title,
            Location: data.Location,
            DateAndTime: new Date(data.DateAndTime),
            Students: data.Students.map(student => this.formatUser(student)),
            AttendanceRecords: data.AttendanceRecords.map(attendance => this.formatAttendance(attendance))
        }
    }

    formatAttendance(data) 
    {
        return {
            Id: data._id,
            Student: this.formatUser(data.Student),
            Attendance: data.Attendance,
        }
    }
    
    formatUser(data) 
    {
        var user = {
            Id: data._id,
            FirstName: data.FirstName,
            LastName: data.LastName,
            Type: data.__t,
        }

        switch(user.Type){
            case"Advisor":
                user.Students = data.Students.map(student => this.formatUser(student));
            break;
            default:
                break;
            }

        // console.log(user);
        return user;
    }
}

module.exports = new ModelFormatter();