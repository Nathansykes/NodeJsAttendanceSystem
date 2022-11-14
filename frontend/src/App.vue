<template>
  <div id="app">
    <LoginVue v-if="!loggedIn"/>
    <Index v-if="loggedIn"/>
  </div>
</template>

<script>

import LoginVue from './components/Login.vue';
import Index from './components/SecureIndex.vue';
import httpCommonService from "./services/http-common.data.service";

export default {
  name: "app",
  data() {
    return {
      loggedIn: httpCommonService.getCookie("access_token")
    }
  },
  components: {
      LoginVue,
      Index
    },
  mounted() {
      if (this.loggedIn) 
      {
        this.$router.push('/users')
      }
      else 
      {
        this.$router.push('/login')
      }
    }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>