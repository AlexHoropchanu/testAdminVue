import Vue from "vue";
import VueRouter from "vue-router";
import Contacts from "../components/Contacts.vue";
import Help from "../components/Help";
// import Statistic from "../components/Statistic.vue";
import BannerSlider from "../components/BannerSlider";
import Films from "../components/Films";
import Kino from "../components/Kino";
import News from "../components/News";
import Promotions from "../components/Promotions";
import Pages from "../components/Pages";
import Users from "../components/Users";
import Mailing from "../components/Mailing";
// import Login from "../components/AuthLayout/Login";
import Layout from '../components/Layout/Layout'
import AuthLayout from '../components/AuthLayout/AuthLayout'
Vue.use(VueRouter);

const routes = [
  {
    path: "/authLayout",
    name: "Authlayout",
    meta: { layout: 'authLayout' },
    component: AuthLayout,
  },
  {
    path: "/layout",
    name: "layout",
    meta: {layout: 'layout'},
    component: Layout,
  },
  {
    path: "/banner-slider",
    name: "BannerSlider",
    meta: {layout: 'layout'},
    component: BannerSlider,
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   meta: {layout: 'authlayout'},
  //   component: Login,
  // },
  {
    path: "/mailing",
    name: "Mailing",
       meta: {layout: 'layout'},
    component: Mailing,
  },
  {
    path: "/users",
    name: "Users",
       meta: {layout: 'layout'},
    component: Users,
  },
  {
    path: "/pages",
    name: "Pages",
       meta: {layout: 'layout'},
    component: Pages,
  },
  {
    path: "/promotions",
    name: "Promotions",
       meta: {layout: 'layout'},
    component: Promotions,
  },
  {
    path: "/news",
    name: "News",
       meta: {layout: 'layout'},
    component: News,
  },
  {
    path: "/kino",
    name: "Kino",
       meta: {layout: 'layout'},
    component: Kino,
  },
  {
    path: "/films",
    name: "Films",
    meta: {layout: 'layout'},
    component: Films,
  },
  {
    path: "/contacts",
    name: "Contacts",
    meta: {layout: 'layout'},
    component: Contacts,
  },
  {
    path: "/statistic",
    name: "Statistic",
    meta: {layout: 'layout'},
    component: ()=> import('../components/Statistic.vue'),
  },
  {
    path: "/help",
    name: "Help",
       meta: {layout: 'layout'},
    component: Help,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
