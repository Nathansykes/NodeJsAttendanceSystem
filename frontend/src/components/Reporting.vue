<template>
    <div id="reporting">

        <body>
            <h3>Reporting</h3>
            <br />
            <div class="row">
                <div class=col-md-3>
                    <select class="form-select" @change="selectStudent">
                        <option value="" selected >Select Student</option>
                        <option v-for="student in this.Students" :key="student.Id" :value="student.Id">{{ student.Id }} - {{student.Name}}</option>
                    </select>
                </div>
                <div class=col-md-3>
                    <select class="form-select" @change="selectCourse">
                        <option value="" selected >Select Course</option>
                        <option v-for="course in this.Courses" :key="course.Id" :value="course.Id">{{ course.Name }}</option>
                    </select>
                </div>
                <div class=col-md-3 v-if="courseId != null">
                    <select class="form-select" @change="selectModule">
                        <option value="" selected >Select Module</option>
                        <option v-for="module in this.Modules" :key="module.Id" :value="module.Id">{{ module.Name }}</option>
                    </select>
                </div>
                <div class="col-md-3" v-else> 
                    <i>Please Select a course before selecting a module</i>
                </div>
                <div class=col-md-3>
                    <button type="button" class="btn btn-primary" @click="GetReport">Get Report</button>
                </div>
            </div>
            <div v-if="this.Report?.Records">
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
        }
    },
    methods: {
        GetReport() {
            if(this.studentId){
                ReportingDataService.getStudentReport(this.studentId, this.courseId, this.moduleId)
                    .then(response => {
                        console.log(response)
                        this.Report = JSON.parse(response.data)
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
            else if (this.moduleId){
                ReportingDataService.getModuleReport(this.moduleId)
                    .then(response => {
                        this.Report = JSON.parse(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
            else if (this.courseId){
                ReportingDataService.getCourseReport(this.courseId)
                    .then(response => {
                        this.Report = JSON.parse(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            } 
            else{
                return;
            }         
        },
        selectStudent(event) {
            this.studentId = event.target.value;
        },
        selectCourse(event) {
            console.log(event.target);
            this.courseId = event.target.value;
            this.PopulateModules(this.courseId);
        },
        selectModule(event) {
            this.moduleId = event.target.value;
        },
        PopulateStudents() {
            ModelDataService.UserDataService.getAll(UserTypes.Student.Id)
                .then(response => {
                    var data = JSON.parse(response.data);
                    this.Students = data.map(x => ({
                        Id: parseInt(x._id),
                        Name: x.FirstName + ' ' + x.LastName,
                    }));
                })
                .catch(error => {
                    console.log(error);
                });
        },
        PopulateCourses() {
            ModelDataService.CourseDataService.getAll()
                .then(response => {
                    var data = JSON.parse(response.data);
                    this.Courses = data.map(x => ({
                        Id: x.Id,
                        Name: x.Title,
                    }));
                })
                .catch(error => {
                    console.log(error);
                });
        },
        PopulateModules() {
            ModelDataService.CourseDataService.getAll()
                .then(response => {
                    var data = JSON.parse(response.data);
                    console.log(data);
                    var modules = data.find(x => x.Id == this.courseId).Modules;
                    this.Modules = modules.map(x => ({
                        Id: x.Id,
                        Name: x.Title,
                    }));
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },
    mounted() {
        this.PopulateStudents();
        this.PopulateCourses();
    }
}
</script>