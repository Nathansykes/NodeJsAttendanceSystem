<template>
    <select class="form-select" @change="selectUserType">
        <option v-for="userType in userTypes" :key="userType.Id" :value="userType.Id">{{userType.Name}}</option>
    </select>
</template>


<script>

import UserTypes from '../../../../shared/usertypes';

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