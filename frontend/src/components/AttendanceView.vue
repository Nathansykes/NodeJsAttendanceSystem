<template>
    <div id="attendance">
        <body v-if="session">
            <h2> {{session.Title + " " + session.Date}} </h2>
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
                    <UserMarkAttendance :value="this.attendances[index].Attendance" @selectMark="(value) => updateMark(value, index)"/>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <button @click="save()">Submit</button>
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
                response.data[0].AttendanceRecords.map(attendance => attendance.Attendance = attendance.Attendance.toString());
                this.session = response.data[0];
                this.students = response.data[0].Students;
                this.attendances = response.data[0].AttendanceRecords;
            });
        },
        updateMark(value, index)
        {
            this.attendances[index].Attendance = value; 
            this.markAttedance(index)
        },
        markAttedance(index) 
        {   
            var student = this.students[index];
            this.attendances[index] =  
            {
                Id : this.attendances[index].Id,
                Student: student,
                Attendance: this.attendances[index].Attendance,
            }
        },
        save() 
        {
            // try and get attendance data first
            if (this.session.AttendanceRecords !== [] && this.session.AttendanceRecords !== undefined) 
            {
                this.attendances.map(attendance => 
                {
                    var updateData = {
                        Attendance : parseInt(attendance.Attendance)
                    };

                    ModelDataService.AttendanceDataService.update(attendance.Id, JSON.stringify(updateData)).then(response => 
                    {
                        console.log(response);
                    })
                    .catch(error => 
                    {
                        console.log(error);
                    });
                })

                this.$router.go("/courses");
            }
            // else try and create
            else
            {
                ModelDataService.AttendanceDataService.create(JSON.stringify(Array.from(this.attendances))).then(response => 
                {
                    const data = JSON.parse(response.data);
                    const attendanceIds = data.map(attendance => attendance._id);
                    let updatedSessionData = 
                    {
                        AttendanceRecords: attendanceIds,
                    };
        
                    console.log(updatedSessionData);
                    ModelDataService.SessionDataService.update(this.sessionId, updatedSessionData).then(response => 
                    {
                        if (response) 
                        {
                            this.$router.go("/courses");
                        }
                    })
                    .catch(error => 
                    {
                        console.log(error);
                    });
                });

            }
        }
    },
    mounted() {
      this.retrieveUsers();
    }
}

</script>