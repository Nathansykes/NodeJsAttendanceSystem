<template>
    <form :v-model="model" class="row justify-content-center">
        <fieldset class="col-6">
            <legend>{{this.title}}</legend>
            <div class="form-group" v-for="(property) in this.modelProperties"
                :key="property">
                <label class="form-label mt-4">{{property.key}}</label> 
                <input v-if="property.key === 'DateAndTime'" class="form-control" type="datetime-local" v-model="property.value"/>
                <input v-else class="form-control" v-model="property.value"/>
            </div>
            <p style="margin-top: 10%;" v-if="errorMessage">{{errorMessage}}</p>
            <button type="submit" class="btn btn-primary" @click="save" style="margin-top:5%">Submit</button>
        </fieldset>
    </form>
</template>

<script>

import ObjectHelper from '@/helpers/object.helper';
import ModelDataService from '@/services/models.data.service';

export default 
{
    name : "CRUDView",
    props: {
        dataService : Object,
        title: String,
    },
    data() {
        return {
            errorMessage : "",
            modelProperties : [],
        }   
    },
    methods: {
        getProperties() {
            this.dataService.get(this.$route.params.id).then(response => 
            {
                var model = JSON.parse(response.data);
                if (Array.isArray(model)) { model = model[0] }
                this.modelProperties = ObjectHelper.GetProperties(model);
            })
            .catch(error => this.errorMessage = ModelDataService.ErrorHandlerService.handlerError(error));
        },
        save() {
            this.dataService.update(this.$route.params.id, ObjectHelper.GetObjectFromProperties(this.modelProperties))
            .then(response => this.$router.push('/home'))
            .catch(error => this.errorMessage = ModelDataService.ErrorHandlerService.handlerError(error));
        }
    },
    mounted() {
        this.getProperties();
    }
}
</script>