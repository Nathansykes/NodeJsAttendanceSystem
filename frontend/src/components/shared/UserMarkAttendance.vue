<template>
    <select class="form-select" @change="selectedMark">
        <option v-for="attendanceType in attendanceTypes" :key="attendanceType.Id" :value="attendanceType.Id">{{attendanceType.Name}}</option>
    </select>
</template>


<script>

import AttendanceTypes from '../../../../shared/attendanceTypes';

export default {
    data () {
        return {
            selectedMark: '',
            attendanceTypes: AttendanceTypes
        }
    },
    emits: ['selectMark'],
    methods: {
        selectUserType: function (event) {
            this.selectedMark = event.target.value,
            this.$emit('selectMark', this.selectedMark);
        }
    }
}
</script>