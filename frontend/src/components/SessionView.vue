<template>
  <div>
    <CRUDView :data-service="this.dataService" title="Sessions" :isReadOnly="!this.canEditSessionData()" />
    <router-link v-if="this.canRegisterAttendance()" :to="`/attendance/${this.$route.params.id}`" class="btn btn-primary" style="margin-top: 2%; margin: 1em; display: inline">Mark Attendance</router-link>
    <form class="Search" v-if="this.canEditSessionData()">
      <select class="form-select" id="studentMenu" @change="selectedUser">
        <option v-for="student in this.filteredStudents" :key="student.Id" :value="student.Id">{{`${student.FirstName} ${student.LastName}`}}</option>
      </select>
      <a class="btn btn-primary" id="submit" @click="addStudent()">Add Student to Session</a>
    </form>
  </div>
</template>

<script>
import ModelDataService from "@/services/models.data.service";
import CRUDView from "./shared/CRUDView.vue";
import permissions from "../services/permissions.data.service";
import { actions } from "../../constants";
import UserTypes from '../../../shared/usertypes';

export default {
  components: {
    CRUDView,
  },
  data() {
    return {
      dataService: ModelDataService.SessionDataService,
      allStudents: [],
      allSessions: [],
      currentStudents: [],
      filteredStudents: [],
      session: null,
      selectedStudentId: null,
    };
  },
  methods: {
    selectedUser(event) {
        this.selectedStudentId = event.target.value;
    },
    getStudents() {
        ModelDataService.UserDataService.getAll(UserTypes.Student.Id).then((response) => {
        // ALL STUDENTS
        var data = JSON.parse(response.data);
        this.allStudents = data;
        this.getCurrentStudents();
      });
    },
    getSession() {
        ModelDataService.SessionDataService.get(this.$route.params.id)
        .then(reponse => this.session = JSON.parse(reponse.data))
        .catch(error => ModelDataService.ErrorHandlerService.handlerError(error));
    },
    getCurrentStudents() {
        ModelDataService.SessionDataService.get(this.$route.params.id).then((response) => {
        // FIND STUDENTS IN CURRENT SESSION
        var data = JSON.parse(response.data)[0];

        this.currentStudents = data.Students;
        this.filteredStudents = this.allStudents.filter((x) => {
          return !this.currentStudents.find((y) => x.Id === y.Id);
        })
      });
    },
    addStudent() {
        ModelDataService.SessionDataService.update(this.$route.params.id, { Students : (this.selectedStudentId) })
        .then(response => console.log(response))
        .catch(error => ModelDataService.ErrorHandlerService.handlerError(error));
    },
    canEditSessionData() {
      return permissions.hasPermission(
        ModelDataService.HTTPCommonDataService.getApplicationUser().UserTypeId,
        actions.EDIT_SESSION
      );
    },
    canRegisterAttendance() {
      return permissions.hasPermission(
        ModelDataService.HTTPCommonDataService.getApplicationUser().UserTypeId,
        actions.MARK_ATTENDANCE
      ); 
    }
  },
  mounted() {
    this.getSession();
    this.getStudents();
  },
};
</script>
