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
            <button type="submit" class="btn btn-primary" @click="save" style="margin-top:5%">Submit</button>
        </fieldset>
    </form>
</template>

<script>

import ObjectHelper from '@/helpers/object.helper';

export default 
{
    name : "CRUDView",
    props: {
        dataService : Object,
        title: String,
    },
    data() {
        return {
            modelProperties : [],
        }   
    },
    methods: {
        getProperties() {
            this.dataService.get(this.$route.params.id).then(response => 
            {
                var model = JSON.parse(response.data);
                if (Array.isArray(model)) 
                {
                    model = model[0]
                }
                this.modelProperties = ObjectHelper.GetProperties(model);
                console.log(this.modelProperties);
            })
            .catch(e => {
                console.log(e);
            });
        },
        save() {
            this.dataService.update(this.$route.params.id, ObjectHelper.GetObjectFromProperties(this.modelProperties))
            .then(response => {
                this.$router.push('/home');
            })
            .catch(e => {
                console.log(e);
            });
        }
    },
    mounted() {
        this.getProperties();
    }
}
</script>