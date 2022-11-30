<template>
    <div id="reporting">

        <body>
            <h3>Reporting</h3>
            <br />
            <div class="row">
                <div class="col-md-3">
                    <select class="form-select" @change="selectCourse" :disabled="this.studentId || this.StudentView">
                        <option v-if="(this.Courses.length > 1)" value="" selected="selected">Select Course</option>
                        <option v-for="course in this.Courses" :key="course.Id" :value="course.Id">{{ course.Name }}
                        </option>
                    </select>
                </div>
                <div class="col-md-3" v-if="this.Modules?.length > 0">
                    <select class="form-select" @change="selectModule">
                        <option v-if="(this.Modules.length > 1)" value="" selected>Select Module</option>
                        <option v-for="module in this.Modules" :key="module.Id" :value="module.Id">{{ module.Name }}
                        </option>
                    </select>
                </div>
                <div class="col-md-3" v-else>
                    <i>Please Select a course before selecting a module</i>
                </div>
                <div class="col-md-3">
                    <select class="form-select" @change="selectStudent">
                        <option value="" selected>Select Student</option>
                        <option v-for="student in this.Students" :key="student.Id" :value="student.Id">{{ student.Id }}
                            - {{ student.Name }}</option>
                    </select>
                </div>
                <div class="col-md-3 flexEvenly">
                    <button type="button" v-if="this.ReportReturned" class="btn btn-primary" @click="DownloadReport">Download</button>
                    <button type="button" class="btn btn-primary" @click="GetReport">Get Report</button>
                </div>
            </div>
            <div v-if="this.ReportReturned">
                <br />
                <h4>{{ this.Report.ReportType }}</h4>
                <hr />
                <table class="table">
                    <thead>
                        <tr>
                            <th v-for="key in Object.keys(this.Report.Records[0])" :key="key">{{ key }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="record in this.Report.Records" :key="record">
                            <td v-for="value in Object.values(record)" :key="value">{{ value }}</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <h4>Mark Overview</h4>
                <hr />
                <table class="table">
                    <thead>
                        <tr>
                            <th>Present</th>
                            <th>Late</th>
                            <th>Absent</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ this.Average.Present.toFixed(1) }}%</td>
                            <td>{{ this.Average.Late.toFixed(1) }}%</td>
                            <td>{{ this.Average.Absent.toFixed(1) }}%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <br />
                <p>No Data available, please search again</p>
            </div>

        </body>
    </div>


</template>

<script>


import ReportingDataService from '../services/reporting.data.service';
import ModelDataService from '../services/models.data.service';
import UserTypes from '../../../shared/usertypes';

export default {
    name: "app",
    data() {
        return {
            studentId: null,
            moduleId: null,
            courseId: null,
            Students: [],
            Modules: [],
            Courses: [],
            Report: {},
            ReportReturned: false,
            ApplicationUser: null,
            Average: {},
            StudentView: false,
            AdvisorView: false,
        }
    },
    methods: {
        GetReport() {
            if (this.AdvisorView && (!(this.courseId) && !(this.studentId))) {
                ReportingDataService.getAdvisorReport(this.ApplicationUser.Id)
                    .then(response => this.setReport(response.data))
                    .catch(error => ModelDataService.ErrorHandlerService.handleError(error));
            }
            else if (this.studentId) {
                ReportingDataService.getStudentReport(this.studentId, this.moduleId, this.courseId)
                    .then(response => this.setReport(response.data))
                    .catch(error => ModelDataService.ErrorHandlerService.handleError(error));
            }
            else if (this.moduleId) {
                ReportingDataService.getModuleReport(this.moduleId)
                    .then(response => this.setReport(response.data))
                    .catch(error => ModelDataService.ErrorHandlerService.handleError(error));
            }
            else if (this.courseId) {
                ReportingDataService.getCourseReport(this.courseId)
                    .then(response => this.setReport(response.data))
                    .catch(error => ModelDataService.ErrorHandlerService.handleError(error));
            }
            else {
                this.setReport(null);
                return;
            }
        },
        setReport(data) {
            if (!data) {
                this.ReportReturned = false;
                return;
            }
            this.Report = JSON.parse(data);
            if (this.Report?.Records?.length > 0) {
                this.ReportReturned = true;
            }
            else {
                this.ReportReturned = false;
            }

            this.calculateAverage();
        },
        selectStudent(event) {
            this.studentId = event.target.value || undefined;
        },
        selectCourse(event) {
            this.courseId = event.target.value || undefined;
            if(this.courseId){
                this.PopulateModules();
            }
            this.moduleId = null;
            this.Modules = null;
            this.studentId = null;
            this.Students = null;
            this.PopulateStudents();
        },
        selectModule(event) {
            this.moduleId = event.target.value || undefined;
            if (this.moduleId) {
                this.PopulateStudents();
            }
        },
        PopulateCourses() {
            ModelDataService.CourseDataService.getAll()
                .then(response => {
                    var data = JSON.parse(response.data);
                    this.Courses = data.map(x => ({
                        Id: x.Id,
                        Name: x.Title,
                    }));
                    if(this.Courses.length == 1){
                        this.courseId = this.Courses[0].Id;
                        this.PopulateModules();
                    }
                })
                .catch(error => ModelDataService.ErrorHandlerService.handleError(error));
        },
        PopulateModules() {
            ModelDataService.CourseDataService.getAll()
                .then(response => {
                    var data = JSON.parse(response.data);
                    var modules = (data.find(x => x.Id == this.courseId)).Modules;
                    this.Modules = modules.map(x => ({
                        Id: x.Id,
                        Name: x.Title,
                    }));
                    if(this.Modules.length == 1){
                        this.moduleId = this.Modules[0].Id;
                        this.PopulateStudents();
                    }
                })
                .catch(error => ModelDataService.ErrorHandlerService.handleError(error));
        },
        PopulateStudents() {
            if (this.StudentView) 
            {
                ModelDataService.UserDataService.get(this.ApplicationUser.Id)
                    .then(response => {
                        var data = JSON.parse(response.data);
                        this.Students = [{
                            Id: parseInt(data.Id),
                            Name: data.FirstName + ' ' + data.LastName,
                        }];
                    })
                    .catch(error => ModelDataService.ErrorHandlerService.handleError(error));
            }
            else if (this.AdvisorView) 
            {
                ModelDataService.UserDataService.get(this.ApplicationUser.Id, this.ApplicationUser.UserTypeId)
                    .then(response => {

                        var advisor = JSON.parse(response.data);
                        var advisorStudents = advisor.Students.map(x => ({
                            Id: parseInt(x.Id),
                            Name: x.FirstName + ' ' + x.LastName,
                        }));

                        if (!this.courseId) {
                            ModelDataService.UserDataService.getAll(UserTypes.Student.Id)
                            .then(response => {
                                var students = JSON.parse(response.data);
                                students = students.map(x => ({
                                    Id: parseInt(x.Id),
                                    Name: x.FirstName + ' ' + x.LastName,
                                }));
                                this.Students = advisorStudents.filter(x => students.find(y => x.Id === y.Id));
                            })
                            .catch(error => ModelDataService.ErrorHandlerService(error));
                        }
                        else {
                            ModelDataService.CourseDataService.getAll()
                                .then(response => {

                                    var students = this.getStudentsFromCurrentCourse(JSON.parse(response.data));
                                    students = students.map(x => ({
                                        Id: parseInt(x.Id),
                                        Name: `${x.FirstName} ${x.LastName}` ,
                                    }));
                                    this.Students = advisorStudents.filter(x => students.find(y => x.Id === y.Id));

                                })
                                .catch(error => ModelDataService.ErrorHandlerService.handleError(error));
                        }
                    })
                    .catch(error => ModelDataService.ErrorHandlerService.handleError(error));
            }
            else 
            {
                if (!this.courseId) {
                    ModelDataService.UserDataService.getAll(UserTypes.Student.Id)
                    .then(response => {
                        var data = JSON.parse(response.data);
                        this.Students = data.map(x => ({
                            Id: parseInt(x.Id),
                            Name: x.FirstName + ' ' + x.LastName,
                        }));
                    })
                    .catch(error => ModelDataService.ErrorHandlerService(error));
                }
                else {
                    ModelDataService.CourseDataService.getAll()
                        .then(response => {

                            var students = this.getStudentsFromCurrentCourse(JSON.parse(response.data));
                            
                            this.Students = students.map(x => ({
                                Id: parseInt(x.Id),
                                Name: `${x.FirstName} ${x.LastName}` ,
                            }));
                        })
                        .catch(error => ModelDataService.ErrorHandlerService.handleError(error));
                }
            }
        },
        getStudentsFromCurrentCourse(data) 
        {
            var modules = (data.find(x => x)).Modules;
            var sessions = (modules.find(x => x)).Sessions;

            if (this.courseId) {
                modules = (data.find(x => x.Id == this.courseId)).Modules;
                sessions = (modules.find(x => x)).Sessions;
            }
            if (this.moduleId) {
                sessions = (modules.find(x => x.Id == this.moduleId)).Sessions;
            }

            return (sessions.find(x => x)).Students;
        },
        calculateAverage() {
            var numberOfLates = 0;
            var numberOfAbsents = 0;
            var numberOfPresents = 0;
            this.Report.Records.map(record => {
                switch(record.AttendanceMark || record.Attendance) {
                    case "Present":
                        numberOfPresents++;
                        break;
                    case "Absent":
                        numberOfAbsents++;
                        break;
                    case "Late":
                        numberOfLates++;
                        break;
                        default:
                            break;
                }
            });
            this.Average = {
                Present : (numberOfPresents / this.Report.Records.length) * 100,
                Absent : (numberOfAbsents / this.Report.Records.length) * 100,
                Late : (numberOfLates / this.Report.Records.length) * 100,
            }
        },
        DownloadReport() {
            ReportingDataService.downloadReport(JSON.stringify({ Report : this.Report})).then(response => 
            {
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";

                var data = JSON.parse(response.data);
                var blob = new Blob([data], {type: "text/csv"});
                var url = window.URL.createObjectURL(blob);
                
                a.href = url;
                a.download = this.Report.ReportType;
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => ModelDataService.ErrorHandlerService.handleError(error));
        }
    },
    mounted() {
        this.ApplicationUser = ModelDataService.HTTPCommonDataService.getApplicationUser();
        this.StudentView = (this.ApplicationUser.UserTypeId === UserTypes.Student.Id);
        this.AdvisorView = (this.ApplicationUser.UserTypeId === UserTypes.AcademicAdvisor.Id);
        this.PopulateStudents();
        this.PopulateCourses();
    }
}
</script>