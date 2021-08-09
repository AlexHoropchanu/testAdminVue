<template>
  <div id="app">
    <component :is="layout">
      </component>
  </div>
</template>
<script>
import AuthLayout from "./components/AuthLayout/AuthLayout.vue";
import Layout from "./components/Layout/Layout.vue";
import firebase from "firebase/app";




export default {

  name: "App",
  computed: {
    layout(){
      return(this.$route.meta.layout || 'authLayout') 
    },
  },
  components: {
    AuthLayout,
    Layout,
  },
  beforeCreate(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(!user){
        this.$router.push('/')
      }
      else{
        this.$router.push('/statistic')
      }
    })
  }
};
</script>

<style lang="scss">
.content-wrapper {
  background-color: #ffffff;
}
</style>
