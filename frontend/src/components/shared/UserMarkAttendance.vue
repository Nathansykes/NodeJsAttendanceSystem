<template>
    <select class="form-select" @change="selectMark">
        <option value="" selected disabled hidden>Select Attendance</option>
        <option v-for="attendanceType in attendanceTypes" :key="attendanceType.Id" :value="attendanceType.Id" :selected="attendanceType.Id.toString() === this.value.toString()">{{attendanceType.Name}}</option>
    </select>
</template>


<script>

import AttendanceTypes from '../../../../shared/attendanceTypes';

export default {
    props: {
        value : String,
    },
    data () {
        return {
            selectedMark: this.value,
            attendanceTypes: AttendanceTypes
        }
    },
    emits: {
        selectMark: String
    },
    methods: {
        selectMark: function (event) {
            this.selectedMark = event.target.value,
            this.$emit('selectMark', this.selectedMark);
        },
    }
}
</script>