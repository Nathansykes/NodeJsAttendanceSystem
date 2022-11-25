<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import httpCommonDataService from '@/services/http-common.data.service'


export default {
  name: "app",
  components: {
    FullCalendar // make the FullCalendar tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: 'timeGridWeek',
  editable: true,
  selectable: true, 
  weekends: false,     
      }
    }
  },
  methods : {
    populateCalendar(){
      try{
       var cookie = httpCommonDataService.getCookie(); //access cookie stored in browser
       
      }catch{

      }
  }
}
}
</script>

<template>
<body onload="populateCalendar()"></body> <!-- run 'populate calendar' function on page load  -->
<FullCalendar :options="calendarOptions" /> 
</template>