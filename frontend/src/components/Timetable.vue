<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import httpCommonDataService from '@/services/http-common.data.service'
import sessionsService from '@/services/session.data.service'
import eventDataService from '@/services/event.data.service'

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
      events: [],
    }
  },
  methods: {
    populateCalendar() {
      try {
        //Get cookie - access_token
        var cookie = httpCommonDataService.getCookie("access_token");
        console.log("here");
        sessionsService.getSessionByCookie(cookie).then(response => 
        {
          console.log("here");
          console.log(response.data);
          console.log(JSON.parse(response.data));
          let sessions = response.data;
          console.log(sessions);
          console.log("test1");
          sessions.map(session => {
            console.log("test")
            let event = new eventDataService.Event(session.Title, session.Location, session.DateAndTime);
            this.events.push(event);
          })
          console.log(this.events);
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