<template>
  <div id="index">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="container">
        <router-link to="/home" class="navbar-brand">{{this.title}}</router-link>
        <div class="navbar-nav me-auto">

          <li v-if="this.showTimetableLink()" class="nav-item">
            <router-link to="/timetable" class="nav-link">Timetable</router-link>
          </li>

          <li v-if="this.showUploadFileDropDown()" class="nav-item dropdown">
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

          <li v-if="this.showReportLink()" class="nav-item">
            <router-link to="/reporting" class="nav-link">Reporting</router-link>
          </li>

          <li v-if="this.showAdvisorViewLink()" class="nav-item">
            <router-link to="/advisor" class="nav-link">Advisor View</router-link>
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
import permissions from '../services/permissions.data.service'
import { actions } from "../../constants";

export default {
  name: "app",
  data(){
        return{
            title: document.title,
            currentUser: httpCommonService.getApplicationUser(),
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
    }
  },
  computed: {
    currentRoute() {
      return this.$route.name;
    }
  },
};
</script>
  