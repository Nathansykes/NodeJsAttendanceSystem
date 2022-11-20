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
            Sessions : data.Sessions.map(session => this.formatSession(session)),
        }
    }
    
    formatSession(data) 
    {    
        return {
            Id: data._id,
            Title: data.Title,
            Location: data.Location,
            DateAndTime: new Date(data.DateAndTime),
            Students: data.Students.map(student => this.formatStudent(student)),
        }
    }
    
    formatStudent(data) 
    {
        return {
            Id: data.Id,
            FirstName: data.FirstName,
            LastName: data.LastName,
        }
    }
}

module.exports = new ModelFormatter();