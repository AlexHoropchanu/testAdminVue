<template>
  <div><Header /><SideBar /><div class="content-wrapper pl-3 pr-3"><router-view /></div></div>
</template>

<script>
import Header from "./Header.vue";
import SideBar from "./SideBar.vue";
export default {
  name:"layout",
  components: {
    Header,
    SideBar,
  },
};
</script>

<style></style>
