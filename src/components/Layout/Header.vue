<template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"
          ><i class="fas fa-bars"></i
        ></a>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <!-- Messages Dropdown Menu -->
      <li class="nav-item mr-3">
        <router-link to="/Login"
          ><i class="fas fa-user mr-2"></i> Мой кабинет</router-link
        >
      </li>
      <li class="nav-item mr-3">
        <i class="fas fa-power-off logout" @click="logout"></i>
      </li>
      <!-- Notifications Dropdown Menu -->
    </ul>
  </nav>
</template>

<script>
import firebase from "firebase/app";
export default {
  name: "Header",
  props: {},
  methods:{
    logout(){
      firebase.auth().signOut()

// user.delete().then(() => {
// }).catch((error) => {
//   console.log(error)
// });
}}};
</script>

<style>
  .logout{
    color: red;
    cursor: pointer;
  }
</style>
