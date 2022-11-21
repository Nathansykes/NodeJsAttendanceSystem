<template>
    <div id="attendance">
        <body>
            <h1>View Attendance</h1>
        </body>
        <table>
            <tr>
                <th>Student</th>
                <th>Mark</th>
            </tr>
            <tr v-for="(student, index) in students" :key="index">
                <td>
                    {{ student.FirstName + " " + student.LastName }}
                </td>
                <td>
                    <UserMarkAttendance @selectedMark="updateMark(value, index)"/>
                </td>
            </tr>
        </table>
        <button>Submit</button>
    </div>
</template>

<script>

import UserMarkAttendance from './shared/UserMarkAttendance.vue';

export default {
    components: {
        UserMarkAttendance
    },
    data() {
      return {
        session: null,
        students: [],
        attedances: [],
        selectedMark: '',
      };
    },
    methods:{
        retrieveUsers(){
            console.log(`Session ID : ${this.$route.params.id}`);
        },
        updateMark(value, index)
        {
            this.selectedMark = value; 
            this.markAttedance(index)
        },
        markAttedance(index) 
        {   
            var student = this.students[index];
            this.attedances[index] =  
            {
                Student: student,
                Date: this.session.DateAndTime,
                Attedance: this.selectedMark,
            }
        },
        save() 
        {

        }
    },
    mounted() {
      this.retrieveUsers();
    }
}

</script>