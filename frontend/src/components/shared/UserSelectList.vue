<template>
    <select class="form-select" @change="selectUserType">
        <option v-for="userType in userTypes" :key="userType">{{userType}}</option>
    </select>
    <input type="hidden" :value=selectedUserType />
</template>


<script>
export default {
    data () {
        return {
        selectedUserType: '',
        userTypes: [
            'All' ,
            'Student',
            'Course Leader',
            'Module Leader',
            'Academic Advisor',
            'Tutor'
            ]
        }
    },
    methods: {
        selectUserType: function (event) {
            this.selected = event.target.value.replace(' ', '');
        }
    }
}
</script>