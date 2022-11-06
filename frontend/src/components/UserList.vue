<template>
    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by name"
            v-model="name"/>
            <UserSelectList />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="searchName"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h4>Users List</h4>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(user, index) in users"
            :key="index"
            @click="setActiveUser(user, index)"
          >
            {{ user._id }}
            <br/>
            {{ user.FirstName + " " + user.LastName }}
          </li>
        </ul>
  
      </div>
      <div class="col-md-6">
        <div v-if="currentUser">
          <h4>User</h4>
          <div>
            <label><strong>Id:</strong></label> {{ currentUser._id }}
          </div>
          <div>
            <label><strong>Name:</strong></label> {{ currentUser.FirstName + " " + currentUser.LastName }}
          </div>
  
          <router-link :to="'/users/' + currentUser._id" class="badge badge-warning">Edit</router-link>
        </div>
        <div v-else>
          <br />
          <p>Please click on an User...</p>
        </div>
      </div>
    </div>
  </template>
  
<script>
  import UserDataService from "../services/user.data.service";
  import UserSelectList from "./shared/UserSelectList.vue";
  
  export default {
    name: "users-list",
    components: {
      UserSelectList
    },
    data() {
      return {
        users: [],
        currentUser: null,
        currentIndex: -1,
        name: ""
      };
    },
    methods: {
      retrieveUsers() {
        UserDataService.getAll()
          .then(response => 
          {
            const users = JSON.parse(response.data);

            this.users = users;
            console.log(users);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      refreshList() {
        this.retrieveUsers();
        this.currentUser = null;
        this.currentIndex = -1;
      },
  
      setActiveUser(user, index) {
        this.currentUser = user;
        this.currentIndex = user ? index : -1;
      },
      
      searchName() {
        const names = this.name.split(" ");       

        UserDataService.findByName('All', names[0], names[1])
          .then(response => 
          {
            const users = JSON.parse(response.data);

            this.users = users;
            console.log(users);
            this.setActiveUser(null);
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.retrieveUsers();
    }
  };
</script>
  
<style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
</style>