import Vue from "vue";
import VueRouter from "vue-router";
import Contacts from "../components/Contacts.vue";
import Help from "../components/Help";
import BannerSlider from "../components/BannerSlider";
import AllCinemas from "../components/Cinemas/AllCinemas";
import News from "../components/News";
import Promotions from "../components/Promotions";
import Pages from "../components/Pages";
import Users from "../components/Users";
import Mailing from "../components/Mailing";
import Layout from "../components/Layout/Layout";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import AllFilms from "../components/Films/AllFilms.vue";
import Edit from "../components/Films/Edit.vue";
import CardCinema from '../components/Cinemas/CardCinema.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/authLayout",
    name: "Authlayout",
    meta: { layout: "authLayout" },
    component: AuthLayout,
  },
  {
    path: "/films",
    name: "AllFilms",
    meta: { layout: "layout" },
    component: AllFilms,
  },
  {
    path: "/films/edit/:id",
    name: "Edit",
    meta: { layout: "layout" },
    component: Edit,
  },
    {
    path: "/cinemas/edit/:id",
    name: "CardCinema",
    meta: { layout: "layout" },
    component: CardCinema,
  },
  // {
  //   path: "/films/edit/:id",
  //   name: "EditFilm",
  //   meta: { layout: "layout" },
  //   component: EditFilm,
  // },
  // {
  //   path: "/films/commingSoon/:id",
  //   name: "EditCommingSoonFilm",
  //   meta: { layout: "layout" },
  //   component: EditFilm,
  // },
  {
    path: "/layout",
    name: "layout",
    meta: { layout: "layout" },
    component: Layout,
  },
  {
    path: "/banner-slider",
    name: "BannerSlider",
    meta: { layout: "layout" },
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
    meta: { layout: "layout" },
    component: Mailing,
  },
  {
    path: "/users",
    name: "Users",
    meta: { layout: "layout" },
    component: Users,
  },
  {
    path: "/pages",
    name: "Pages",
    meta: { layout: "layout" },
    component: Pages,
  },
  {
    path: "/promotions",
    name: "Promotions",
    meta: { layout: "layout" },
    component: Promotions,
  },
  {
    path: "/news",
    name: "News",
    meta: { layout: "layout" },
    component: News,
  },
  {
    path: "/cinemas",
    name: "AllCinemas",
    meta: { layout: "layout" },
    component: AllCinemas,
  },

  {
    path: "/contacts",
    name: "Contacts",
    meta: { layout: "layout" },
    component: Contacts,
  },
  {
    path: "/statistic",
    name: "Statistic",
    meta: { layout: "layout" },
    component: () => import("../components/Statistic.vue"),
  },
  {
    path: "/help",
    name: "Help",
    meta: { layout: "layout" },
    component: Help,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
