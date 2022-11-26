<template>
    <div>
        <CRUDView :data-service="this.dataService" title="Sessions"/>
        <router-link :to="`/attendance/${this.$route.params.id}`" class="btn btn-primary" style="margin-top:2%">Mark Attendance</router-link>
    </div>
</template>

<script>
import ModelDataService from '@/services/models.data.service';
import CRUDView from './shared/CRUDView.vue';

export default 
{
    components: {
        CRUDView
    },
    data() {
        return {
            dataService : ModelDataService.SessionDataService,
        }   
    } 
}
</script>