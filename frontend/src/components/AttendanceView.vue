<template>
    <div id="attendance">
        <body>
            <header>View Attendance</header>
        </body>
            <main>
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Absent/Late/Present</th>
                        <th>Lesson</th>
                    </tr>
                    <tr>
                        <td></td>
                        <input type="number" min="0" max="2">
                        <td></td>
                    </tr>
                </table>
            </main>
    </div>
</template>

<script>

import { response } from 'express';
import UserDataService from '../services/user.data.service';
import UserMarkAttendance from './shared/UserMarkAttendance.vue';

export default {
    name: student-list,
    components: {
        UserMarkAttendance
    },

    data(){
        
    },
    methods:{
        retrieveUsers(){
            UserDataService.getAll(UserMarkAttendance.selectedMark)
            .then(response =>{
                const marks = JSON.parse(response.data);
                this.marks = marks;
            })
            .catch(e =>{
                console.log(e);
            });
        }
    }

}

</script>