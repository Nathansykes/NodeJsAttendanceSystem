<template>
  <div id="app">
    <LoginVue v-if="!loggedIn"/>
    <Index v-if="loggedIn"/>
  </div>
</template>

<script>

import LoginVue from './components/Login.vue';
import Index from './components/SecureIndex.vue';

export default {
  name: "app",
  data() {
    return {
      loggedIn: localStorage.getItem("user")
    }
  },
  
  components: {
      LoginVue,
      Index
    },
    methods: { 
    // getUserDetails() 
    //   {
    //     // get token from localstorage
    //     let token = localStorage.getItem("user");
    //     if (token) 
    //     {
    //       return true;
    //     }

    //     return false;
    // }

    
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