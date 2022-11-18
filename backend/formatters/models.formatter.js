class ModelFormatter 
{
    formatCourse(data) 
    {
        var modules = [];
    
        data.Modules.forEach(module => 
        {
            modules.push(this.formatModule(module));
        });
    
        var model = {
            Id: data._id,
            Title: data.Title,
            CourseLeader: data.CourseLeader ?? "n/a",
            Modules : modules,
          }
    
        return model;
    }
    
    formatModule(data) 
    {
        var sessions = [];
    
        data.Sessions.forEach(session => 
        {
            sessions.push(this.formatSession(session));
        });
    
        var model = {
            Id: data._id,
            Title: data.Title,
            ModuleLeader: data.ModuleLeader ?? "n/a",
            Sessions : sessions,
        }
    
        return model
    }
    
    formatSession(data) 
    {
        var students = [];
    
        data.Students.forEach(student => 
        {
            students.push(this.formatStudent(student));
        });
    
        var model = {
            Id: data._id,
            Title: data.Title,
            Location: data.Location,
            DateAndTime: new Date(data.DateAndTime),
            Students: students,
        }
    
        return model;
    }
    
    formatStudent(data) 
    {
        var model = {
            Id: data.Id,
            FirstName: data.FirstName,
            LastName: data.LastName,
        }
    
        return model;
    }
}

module.exports = new ModelFormatter();