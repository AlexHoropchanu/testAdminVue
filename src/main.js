import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "admin-lte/plugins/jquery/jquery.min.js";
import "admin-lte/plugins/bootstrap/js/bootstrap.min.js";
import "admin-lte/dist/css/adminlte.min.css";
import "admin-lte/dist/js/adminlte.min.js";
import "admin-lte/plugins/fontawesome-free/css/all.min.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: "AIzaSyBaIOs1xofoZXZot2YUGtK3NoVXezSNnW8",
  authDomain: "vuetraine-deb7e.firebaseapp.com",
  projectId: "vuetraine-deb7e",
  storageBucket: "gs://vuetraine-deb7e.appspot.com",
  messagingSenderId: "1012917689741",
  appId: "1:1012917689741:web:2b1fac7af9aa55a20331c4",
  measurementId: "G-580XG6N6BH",
});
let app;
if (!app) {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
}
