<template>
    <div>
        <CRUDView :data-service="this.dataService" title="Sessions" :isReadOnly="this.canEditSessionData()"/>
        <router-link v-if="!this.canEditSessionData()" :to="`/attendance/${this.$route.params.id}`" class="btn btn-primary" style="margin-top:2%">Mark Attendance</router-link>
    </div>
</template>

<script>
import ModelDataService from '@/services/models.data.service';
import CRUDView from './shared/CRUDView.vue';
import permissions from '../services/permissions.data.service';
import { actions } from "../../constants";
import httpCommonDataService from '@/services/http-common.data.service';

export default 
{
    components: {
        CRUDView
    },
    data() {
        return {
            dataService : ModelDataService.SessionDataService,
        }   
    },
    methods: {
        canEditSessionData() {
            //Invert the return as we are using a variable called 'isReadOnly' -- 
            //The hasPermission function returns true if the current user has permission to edit a session
            //Therefore we want 'isReadOnly' to be true.
            return !permissions.hasPermission(httpCommonDataService.getApplicationUser().UserTypeId, actions.EDIT_SESSION);
        }
    }
}
</script>