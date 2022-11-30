<template>
    <div id="attendance">
        <body v-if="session">
            <h2> {{session.Title + " " + new Date(session.DateAndTime).toLocaleString()}} </h2>
        </body>
        <form>
            <div class="container">
                <div class="row justify-content-start">
                    <div class="col"><h4>Student</h4></div>
                    <div class="col"><h4>Attendance</h4></div>
                </div>
                <div class="row justify-content-start" v-for="(student, index) in students" :key="index">
                    <div class="col">
                        {{ student.FirstName + " " + student.LastName }}
                    </div>
                    <div class="col">
                        <UserMarkAttendance style="margin: 0.2rem" :value="this.attendances[index]?.Attendance || -1" @selectMark="(value) => updateMark(value, index)"/>
                    </div>
                </div>
                <div class="row justify-content-start">
                    <div class="col"></div>
                    <div class="col">
                        <button class="btn btn-primary" style="margin-top:2%" @click="save()">Submit</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>

import UserMarkAttendance from './shared/UserMarkAttendance.vue';
import ModelDataService from '../services/models.data.service';
import permissions from "../services/permissions.data.service";
import { actions } from "../../constants";

export default {
    components: {
        UserMarkAttendance
    },
    data() {
      return {
        session: null,
        sessionId: null,
        students: [],
        attendances: [],
        selectedMark: '',
      };
    },
    methods:{
        retrieveUsers(){
            this.sessionId = this.$route.params.id;
            ModelDataService.SessionDataService.get(this.sessionId).then(response => 
            {
                var data = JSON.parse(response.data)[0]
                data.AttendanceRecords.map(attendance => attendance.Attendance = attendance.Attendance.toString());
                this.session = data;
                this.students = data.Students;
                this.attendances = data.AttendanceRecords;
                if (new Date() < new Date(this.session.DateAndTime)) 
                {
                    this.$router.push(this.$router.options.history.state.back || "/home");
                }
            })
            .catch(error => ModelDataService.ErrorHandlerService.handlerError(error));
        },
        updateMark(value, index)
        {
            var student = this.students[index];
            this.attendances[index] =  
            {
                Id : this.attendances[index]?.Id,
                Student: student,
                Attendance: value,
            }
        },
        save() 
        {
            var attendancesToCreate = this.attendances.filter(x => !x.Id)
            this.attendances = this.attendances.filter(x => !(attendancesToCreate.find(y => x === y)));

            // try and get attendance data first
            if (this.session.AttendanceRecords && this.session.AttendanceRecords.length > 0) 
            {
                this.attendances.map(attendance =>
                {
                    ModelDataService.AttendanceDataService.update(attendance.Id, JSON.stringify({ Attendance : parseInt(attendance.Attendance) }))
                    .then(response => console.log(response))
                    .catch(error => ModelDataService.ErrorHandlerService.handlerError(error));
                })
            }
            if (attendancesToCreate && attendancesToCreate.length > 0) 
            {
                // else try and create
                ModelDataService.AttendanceDataService.create(JSON.stringify(Array.from(attendancesToCreate))).then(response => 
                {
                    const data = JSON.parse(response.data);
                    data.map(attendance => this.attendances.push(attendance));
                    const attendanceIds = this.attendances.map(attendance => attendance._id || attendance.Id);

                    ModelDataService.SessionDataService.update(this.sessionId, { AttendanceRecords : attendanceIds.join(",") })
                    .then(response => this.$router.go(this.$router.options.history.state.back || "/home"))
                    .catch(error => ModelDataService.ErrorHandlerService.handlerError(error));
                });
            }
        },
        canRegisterAttendance() {
            return permissions.hasPermission(
                ModelDataService.HTTPCommonDataService.getApplicationUser().UserTypeId,
                actions.MARK_ATTENDANCE);            
        }
    },
    mounted() {
        if (!this.$route.params.id || !this.canRegisterAttendance()) {
            this.$router.push(this.$router.options.history.state.back || "/home");
        }
        this.retrieveUsers();
    }
}

</script>