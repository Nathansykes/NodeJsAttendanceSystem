<template>
    <div id="index">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/users" class="nav-link">Users</router-link>
          </li>
  
          <li class="nav-item">
            <router-link to="/add-user" class="nav-link">Add</router-link>
          </li>
  
          <form action="/" class="nav-item">
            <input type="submit" to="/login" class="nav-link" value="Logout" @click="Logout()"/>
          </form>
  
        </div>
      </nav>
  
      <div class="container mt-3">
        <h2>Attendance</h2>
        <router-view />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "app",
    methods : 
    {
      Logout() 
      {
        localStorage.removeItem("user");
        this.$router.push("/");
      }
    }
  };
  </script>
  
  <style>
  #index {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav-item button, input[type="submit"], input[type="reset"] {
    background: none;
    border: none;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
  </style>