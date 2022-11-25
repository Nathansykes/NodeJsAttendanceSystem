<template>
    <CRUDView :data-service="this.dataService" title="Sessions"/>
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