<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import httpCommonDataService from '@/services/http-common.data.service'
import sessionsService from '@/services/session.data.sevice'

export default {
  name: "app",
  components: {
    FullCalendar // make the FullCalendar tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: 'timeGridWeek',
        editable: true,
        selectable: true,
        weekends: false,
      },
      studentSessions: [],
    }
  },
  methods: {
    populateCalendar() {
      try {
        //Get cookie - access_token
        var cookie = httpCommonDataService.getCookie("access_token");
        console.log("here");
        sessionsService.getByStudentId(cookie).then(response => 
        {
          console.log("here");
          console.log(response.data);
          console.log(JSON.parse(response.data));

        });
      } catch (error) {
        console.log(error);
      }
    },
    getAllSessions(userId) {
      let sessions = sessionsService.getAll()
      .then(response => {
        const data = JSON.parse(response.data);
        sessions = data;
        this.getAllUserSessions(sessions, userId);
      }).catch(error => {
        console.log(error);
      })
    },
    getAllUserSessions(sessions, userId) {
      sessions.map(session => {
        session.Students.map(student => {
          if (parseInt(student.Id) == parseInt(userId))
          {
            this.studentSessions.push(session);
          }
        })
      })
    }
  },
  mounted(){
    this.populateCalendar();
  }
}
</script>

<template>
    <FullCalendar :options="calendarOptions" />
</template>