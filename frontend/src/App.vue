<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/users" class="nav-link">Users</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/add-user" class="nav-link">Add</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/upload" class="nav-link">Upload</router-link>
        </li>

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
  name: "app"
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>