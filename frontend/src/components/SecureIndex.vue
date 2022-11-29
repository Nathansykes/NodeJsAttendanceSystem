<template>
  <div id="index">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="container">
          <router-link :to="this.getDefaultRoute()" class="navbar-brand">{{this.title}}</router-link>
        <div class="navbar-nav me-auto">

          <li v-if="this.showTimetableLink()" class="nav-item">
            <router-link to="/timetable" class="nav-link">Timetable</router-link>
          </li>

          <li v-if="this.showUploadFileDropDown()" class="nav-item dropdown">
            <a class="nav-link" href="#">
              <router-link to="/upload" class="dropdown-item">Upload File</router-link>
            </a>
          </li>

          <li v-if="this.showReportLink()" class="nav-item">
            <router-link to="/reporting" class="nav-link">Reporting</router-link>
          </li>

          <li v-if="this.showAdvisorViewLink()" class="nav-item">
            <router-link to="/advisor" class="nav-link">Advisor View</router-link>
          </li>

        </div>
        <div class="navbar-nav mr-auto">
          <li id="currUser" class="nav-item">
            <form>
              <input type="submit" class="nav-link" :value="this.currentUserName" />
            </form>
          </li>
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
import permissions from '../services/permissions.data.service'
import { actions } from "../../constants";

export default {
  name: "app",
  data(){
        return{
            title: document.title,
            currentUser: httpCommonService.getApplicationUser(),
            currentUserName: httpCommonService.getApplicationUser().Name
        }
    },
  methods:
  {
    Logout() {
      httpCommonService.deleteCookie("access_token");
      this.$router.push("/");
    },
    showTimetableLink()
    {
      return permissions.hasPermission(this.currentUser.UserTypeId, actions.VIEW_TIMETABLE);
    },
    showUploadFileDropDown()
    {
      return permissions.hasPermission(this.currentUser.UserTypeId, actions.UPLOAD_FILE);
    },
    showAdvisorViewLink()
    {
      return permissions.hasPermission(this.currentUser.UserTypeId, actions.VIEW_ADVISOR_VIEW);
    },
    showReportLink()
    {
      return permissions.hasPermission(this.currentUser.UserTypeId, actions.VIEW_REPORT);
    },
    canReturnToHome()
    {
      return permissions.hasPermission(this.currentUser.UserTypeId, actions.RETURN_HOME)
    },
    getDefaultRoute()
    {
      if (httpCommonService.getApplicationUser().UserTypeId == 1)
      {
        return("/timetable");
      }
      
      return("/home");
    }
  },
  mounted() {
    console.log(this.currentUserName);
  },
  computed: {
    currentRoute() {
      return this.$route.name;
    }
  },
};
</script>
  
<style>
  #currUser{
    color: white;
    
  }
</style>