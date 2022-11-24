<template>
    <form :v-model="model" class="row justify-content-center">
        <fieldset class="col-6">
            <legend>Course</legend>
            <div class="form-group" v-for="(property) in this.courseProperties"
                :key="property">
                <label class="form-label mt-4">{{property.key}}</label> 
                <input class="form-control" v-model="property.value"/>
            </div>
            <button type="submit" style="margin-top: 5%;" class="btn btn-primary" @click="save">Submit</button>
        </fieldset>
    </form>
</template>

<script>
import ModelDataService from '@/services/models.data.service';
import ObjectHelper from '@/helpers/object.helper';

export default 
{
    data() {
        return {
            courseProperties : [],
        }   
    },
    methods: {
        getCourseProperties() {
            ModelDataService.CourseDataService.get(this.$route.params.id).then(response => 
            {
                this.courseProperties = ObjectHelper.GetProperties(JSON.parse(response.data));
            })
            .catch(e => {
                console.log(e);
            });
        },
        save() {
            ModelDataService.CourseDataService.update(this.$route.params.id, ObjectHelper.GetObjectFromProperties(this.courseProperties))
            .then(response => {
                this.$router.push('/home');
            })
            .catch(e => {
                console.log(e);
            });
        }
    },
    mounted() {
        this.getCourseProperties();
    }
    
}
</script>