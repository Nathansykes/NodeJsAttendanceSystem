<template>
  <div id="app">
    <ErrorView v-if="hasError" />
    <Index v-else-if="loggedIn"/>
    <LoginVue v-else-if="!loggedIn"/>
  </div>
</template>

<script>

import LoginVue from './components/Login.vue';
import Index from './components/SecureIndex.vue';
import ModelDataService from './services/models.data.service';
import ErrorView from './components/Error.vue'

export default {
  name: "app",
  data() {
    return {
      loggedIn: false,
      hasError: false,
    }
  },
  components: {
      LoginVue,
      Index,
      ErrorView,
    },
  methods: {
    isLoggedIn() {
      ModelDataService.AuthenticationDataService.verifyToken()
      .then(response => 
      {
        if(response.status == 200) {
          this.loggedIn = true;
          this.hasError = false;
        }
        this.updateRoutes();
      })
      .catch(error => ModelDataService.ErrorHandlerService.handlerError(error));
    },
    loadFonts() {
      var fontAwesome = document.createElement('script')
      fontAwesome.setAttribute('src', 'https://kit.fontawesome.com/93c807bff0.js')
      document.head.appendChild(fontAwesome)
    },
    updateRoutes() {
      if (this.loggedIn) 
      {
        if(window.location.pathname == "/" || window.location.pathname == "/login"){
          this.$router.push('/home')
        }
      }
      else 
      {
        this.$router.push('/login')
      }
    }
  },
  mounted() {
      this.loadFonts();
      if(window.location.pathname.includes('error')){
        this.hasError = true;
      }
      if(!this.hasError){
        this.isLoggedIn();
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