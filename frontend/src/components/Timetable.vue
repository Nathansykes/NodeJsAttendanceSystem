<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import httpCommonDataService from "@/services/http-common.data.service";
import ModelDataService from "@/services/models.data.service";

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
        eventClick: this.onEventClick,
        events: [],
      },
    };
  },
  methods: {
    populateCalendar() {
      try {
        ModelDataService.SessionDataService.getSessionForUser().then((response) => {
          let sessions = JSON.parse(response.data);
          sessions.map((session) => {
            let event = {
              id : session.Id,
              title: session.Title ?? "N/A",
              start: session.DateAndTime,
              extendedProps: { location: session.Location },
            };
            this.calendarOptions.events.push(event);
          });
        });
      } catch (error) {
        ModelDataService.ErrorHandlerService(error);
      }
    },
    getAllSessions(userId) {
      let sessions = ModelDataService.SessionDataService
        .getAll()
        .then((response) => {
          const data = JSON.parse(response.data);
          sessions = data;
          this.getAllUserSessions(sessions, userId);
        })
        .catch(error => ModelDataService.ErrorHandlerService(error));
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
    onEventClick(eventClickInfo) {
      this.$router.push(`/sessions/${eventClickInfo.event.id}`)
      console.log(eventClickInfo);
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
