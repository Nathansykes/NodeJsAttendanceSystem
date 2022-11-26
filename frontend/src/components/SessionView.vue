<template>
    <CRUDView :data-service="this.dataService" title="Sessions"/>
    <router-link :to="`/attendance/${this.$route.params.id}`" custom v-slot="{ navigate }">
      <button class="btn btn-primary" @click="navigate" role="link">Mark Attendance</button>
    </router-link>
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