<template>
  <div id="index">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">{{this.title}}</a>
        <div class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link to="/users" class="nav-link">Users</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/add-user" class="nav-link">Add</router-link>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Upload File
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link to="/upload" class="dropdown-item">Users</router-link>
              </li>
            </ul>
          </li>

        </div>
        <div class="navbar-nav mr-auto">
          <li class="nav-item">
            <form action="/">
              <input type="submit" to="/login" class="nav-link" value="Logout" @click="Logout()" />
            </form>
          </li>
        </div>
      </div>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>
  
<script>

import httpCommonService from "../services/http-common.data.service";

export default {
  name: "app",
  data(){
        return{
            title: document.title,
        }
    },
  methods:
  {
    Logout() {
      httpCommonService.deleteCookie("access_token");
      this.$router.push("/");
    }
  },
  computed: {
    currentRoute() {
      return this.$route.name;
    }
  }
};
</script>
  