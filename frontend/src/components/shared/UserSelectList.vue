<template>
    <select class="form-select" @change="selectUserType">
        <option v-for="userType in userTypes" :key="userType.id" :value="userType.id">{{userType.name}}</option>
    </select>
</template>


<script>

import UserTypes from '../../../public/usertypes';

export default {
    data () {
        return {
            selectedUserType: '',
            userTypes: UserTypes
        }
    },
    emits: ['selectUserType'],
    methods: {
        selectUserType: function (event) {
            this.selectedUserType = event.target.value,
            this.$emit('selectUserType', this.selectedUserType);
        }
    }
}
</script>