<template>
    <div id="attendance">
        <body v-if="session">
            <h2> {{session.Title + " " + new Date(session.DateAndTime).toLocaleString()}} </h2>
        </body>
        <table style="width:75%">
            <tr>
                <th>Student</th>
                <th>Attendance</th>
            </tr>
            <tr v-for="(student, index) in students" :key="index">
                <td>
                    {{ student.FirstName + " " + student.LastName }}
                </td>
                <td>
                    <UserMarkAttendance :value="this.attendances[index]?.Attendance || -1" @selectMark="(value) => updateMark(value, index)"/>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <button id ="addStudent" class="btn btn-primary" style="margin-top:2%" @click="addStudent()">Add Student</button> 
                </td>
                <td>
                    <button class="btn btn-primary" style="margin-top:2%" @click="save()">Submit</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>

import UserMarkAttendance from './shared/UserMarkAttendance.vue';
import ModelDataService from '../services/models.data.service';

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
            if (this.session.AttendanceRecords !== [] && this.session.AttendanceRecords !== undefined) 
            {
                this.attendances.map(attendance =>
                {
                    ModelDataService.AttendanceDataService.update(attendance.Id, JSON.stringify({ Attendance : parseInt(attendance.Attendance) }))
                    .then(response => console.log(response))
                    .catch(error => ModelDataService.ErrorHandlerService.handlerError(error));
                })
            }
            if (attendancesToCreate !== [] && attendancesToCreate !== undefined ) 
            {
                // else try and create
                ModelDataService.AttendanceDataService.create(JSON.stringify(Array.from(attendancesToCreate))).then(response => 
                {
                    const data = JSON.parse(response.data);
                    data.map(attendance => this.attendances.push(attendance));
                    const attendanceIds = this.attendances.map(attendance => attendance._id || attendance.Id);

                    ModelDataService.SessionDataService.update(this.sessionId, { AttendanceRecords : attendanceIds.join(",") })
                    .then(response => this.$router.go("/home"))
                    .catch(error => ModelDataService.ErrorHandlerService.handlerError(error));
                });
            }
        },
        addStudent(){

        }
    },
    mounted() {
        if (!this.$route.params.id) {
            this.$router.push("/home");
        }
        this.retrieveUsers();
    }
}

</script>