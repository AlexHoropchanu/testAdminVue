<template>
  <div>
    <div class="top__block">
      <ul>
        <Banner
          class="col-lg-3"
          :card="banner"
          v-for="banner in getBanners"
          :key="banner.id"
        >
        </Banner>
      </ul>
      <button @click="save">save</button>
      <div @click="addBanner">+</div>
    </div>
  </div>
</template>

<script>
import Banner from "../components/Banner.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    Banner,
  },
  data() {
    return {};
  },
  async mounted() {
    await this.$store.dispatch("getBanners");
    console.log(typeof getBanners);
  },
  name: "BannerSlider",
  computed: {
    ...mapGetters(["getBanners", "getImageUrl"]),
  },
  methods: {
    ...mapMutations(["changeImageUrl", "changeImage", "addBanner"]),
    ...mapActions(["save"]),
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: inherit;
      margin: 30px;
    }
  }
}
button {
  width: inherit;
  margin-bottom: 30px;
}
label {
  width: inherit;
  display: flex;
  input {
    width: inherit;
  }
  span {
    width: 65px;
  }
}
</style>
