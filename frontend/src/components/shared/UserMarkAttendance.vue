<template>
    <select class="form-select" @change="selectMark">
        <option v-for="attendanceMark in attendanceMark" :key="attendanceMark.selectMark" :value="attendanceMark.selectMark">{{attendanceMark.selectMark}}</option>
    </select>

</template>

<script>
    import Attendance from '../../../../shared/attendanceClass';


    export default{
        date() {
            return {
                selectedMark: '',
                AttendanceClass: Attendance
            }
        },
        emits: ['selectMark'],
        methods: {
            attendanceMark: function(event){
                this.selectedMark = event.target.value,
                this.$emit('selectMark', this.selectedMark);
            }
        }
    }
</script>