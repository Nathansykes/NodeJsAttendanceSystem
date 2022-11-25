<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  name: "app",
  components: {
    FullCalendar // make the FullCalendar tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridWeek'
      }
    }
  }
}
</script>

<template> 
<FullCalendar :options="calendarOptions" /> 
</template>