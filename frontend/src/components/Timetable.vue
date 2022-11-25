<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import httpCommonDataService from "@/services/http-common.data.service";
import sessionsService from "@/services/session.data.service";

export default {
  name: "app",
  components: {
    FullCalendar, // make the FullCalendar tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: "timeGridWeek",
        editable: true,
        selectable: true,
        weekends: false,
        events: [],
      },
    };
  },
  methods: {
    populateCalendar() {
      try {
        sessionsService.getSessionForUser().then((response) => {
          let sessions = JSON.parse(response.data);
          sessions.map((session) => {
            let event = {
              title: session.Title ?? "N/A",
              start: session.DateAndTime,
              extendedProps: { location: session.Location },
            };
            this.calendarOptions.events.push(event);
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
    getAllSessions(userId) {
      let sessions = sessionsService
        .getAll()
        .then((response) => {
          const data = JSON.parse(response.data);
          sessions = data;
          this.getAllUserSessions(sessions, userId);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAllUserSessions(sessions, userId) {
      sessions.map((session) => {
        session.Students.map((student) => {
          if (parseInt(student.Id) == parseInt(userId)) {
            this.studentSessions.push(session);
          }
        });
      });
    },
  },
  mounted() {
    this.populateCalendar();
  },
};
</script>

<template>
  <FullCalendar :options="calendarOptions" />
</template>
