<template>
    <div>
        <form :v-model="model" class="row justify-content-center">
            <fieldset class="col-6">
                <legend>{{this.title}}</legend>
                <div class="form-group" v-for="(property) in this.modelProperties"
                    :key="property">
                    <label class="form-label mt-4">{{property.key}}</label> 
                    <input :readonly="this.isReadOnly" v-if="property.key === 'DateAndTime'" class="form-control" type="datetime-local" v-model="property.value" maxlength="100"/>
                    <input :readonly="this.isReadOnly" v-else class="form-control" v-model="property.value" maxlength="100"/>
                </div>
                <p style="margin-top: 10%;" v-if="errorMessage">{{errorMessage}}</p>
            </fieldset>
        </form>
        
        <div class="form-group" style="margin-top:3%">
            <button :disabled="this.isReadOnly" style="margin:2%" class="btn btn-secondary" type="button" @click="cancel()">Cancel</button>
            <button :disabled="this.isReadOnly" style="margin:2%" class="btn btn-primary" data-bs-target="#myModal" data-bs-toggle="modal">Delete</button>
            <button :disabled="this.isReadOnly" style="margin:2%" class="btn btn-primary" type="button" @click="save()">Save</button>
        </div>

        <div class="modal" id="myModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Delete</h5>
                        <button :disabled="this.isReadOnly" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure you want to delete this item?</p>
                    </div>
                    <div class="modal-footer">
                        <button :disabled="this.isReadOnly" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button :disabled="this.isReadOnly" type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="remove">Delete</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
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
        isReadOnly: Boolean
    },
    data() {
        return {
            errorMessage : "",
            modelProperties : [],
            model: null
        }   
    },
    methods: {
        getProperties() {
            this.dataService.get(this.$route.params.id).then(response => 
            {
                this.model = JSON.parse(response.data);
                if (Array.isArray(this.model)) { this.model = this.model[0] }
                this.modelProperties = ObjectHelper.GetProperties(this.model);
            })
            .catch(error => this.errorMessage = ModelDataService.ErrorHandlerService.handlerError(error));
        },
        remove() {
            this.dataService.delete(this.$route.params.id)
            .then(response => this.$router.push('/home'))
            .catch(error => this.errorMessage = ModelDataService.ErrorHandlerService.handlerError(error));
        },
        save() {
            this.dataService.update(this.$route.params.id, ObjectHelper.GetObjectFromProperties(this.modelProperties))
            .then(response => this.$router.push('/home'))
            .catch(error => this.errorMessage = ModelDataService.ErrorHandlerService.handlerError(error));
        },
        cancel() {
            this.$router.push(this.$router.go(-1));
        },
        disableDate(evt) {
            return false;
        }
    },
    mounted() {
        this.getProperties();
    }
}
</script>