<template>
<div class="list-row">
    <div class="col-md-12">
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Search Student By Name"
            v-model="name"/>
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="searchStudent()">
                Search Student
                </button>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <h4>Your list of students</h4>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(user, index) in users"
            :key="index"
            @click="routeToUser(user)"
          >
            {{ user.Id }}
            <br/>
            {{ user.FirstName + " " + user.LastName }}
          </li>
        </ul>
        <div>
        <router-link :to="`/users/${user.Id}`" class="btn btn-light" v-if="currentUser === 'users'">Edit</router-link>
        </div>
    </div>
    
    </div>
</template>
<script>
    import userDataService from '@/services/user.data.service';
    import UserTypes from '../../../shared/usertypes';
    import httpCommonDataService from '@/services/http-common.data.service';
    export default{
        name: "advisors-Student-List",
        data(){
            return{
                users:[],
                currentUser: null,
                currentIndex: -1,
                name: "",
                studentList:[]
            };
        },
        methods:{
            retrieveStudents(){
                let loggedInUserID = httpCommonDataService.getApplicationUser().Id;
                userDataService.get(loggedInUserID, UserTypes.AcademicAdvisor.Id)
                .then(response =>{
                    const advisor = JSON.parse(response.data);
                    this.users = advisor.Students;
                })
                .catch(e =>{
                    console.log(e);
                });
            },
            refreshList(){
                this.retrieveStudents();
                this.currentUser = null;
                this.currentIndex = -1;
            },

            routeToUser(user) {
                this.$router.push(`/users/${user.Id}`)
            },

            searchStudent(){
                const names = this.name.split(" ");
                if(names ==""){
                    this.retrieveStudents();
                }
                if(names){
                    this.users = this.users.filter(user => 
                    {
                        return (user.FirstName.toLowerCase() === names[0]?.toLowerCase() || user.LastName.toLowerCase() === names[1]?.toLowerCase()) || user.LastName.toLowerCase() === names[0]?.toLocaleLowerCase();
                    });
                    }
            }
        },
        mounted(){
            this.retrieveStudents();
        }
    };
</script>