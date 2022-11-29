<template>
  <div id="app">
    <LoginVue v-if="!loggedIn"/>
    <Index v-if="loggedIn"/>
  </div>
</template>

<script>

import LoginVue from './components/Login.vue';
import Index from './components/SecureIndex.vue';
import ModelDataService from './services/models.data.service';

export default {
  name: "app",
  data() {
    return {
      loggedIn: false,
    }
  },
  components: {
      LoginVue,
      Index
    },
  methods: {
    isLoggedIn() {
      ModelDataService.AuthenticationDataService.verifyToken()
      .then(response => 
      {
        this.loggedIn = (response.status === 200)
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
  
      this.isLoggedIn();
      this.loadFonts();
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