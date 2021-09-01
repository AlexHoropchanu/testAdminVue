<template>
  <div>
    <div class="top__block">
      <div class="spinner-border" role="status" v-if="!getPreloader"></div>
      <div class="top banner">
        <h3 style="text-align: center">На главной верх</h3>
        <ul v-if="getPreloader">
          <Banner
            class="col-lg-3"
            :card="banner"
            v-for="banner in getBanners"
            :key="banner.id"
          >
          </Banner>
        </ul>

        <button @click="save" class="btn btn-primary button">save</button>
        <div @click="addBanner" class="btn btn-primary button">
          Добавить баннер
        </div>
      </div>
    </div>
    <div class="background__Banner">
      <h3 style=" text-align: center">Баннер на заднем фоне</h3>
      <CardBackgroundWrapper></CardBackgroundWrapper>
    </div>
    <div class="news__banner">
      <CardNewsWrapper></CardNewsWrapper>
    </div>
  </div>
</template>

<script>
import Banner from "../components/Banner.vue";
import CardNewsWrapper from "../components/banners/CardNewsWrapper.vue";
import CardBackgroundWrapper from "../components/banners/CardBackgroundWrapper.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    CardBackgroundWrapper,
    CardNewsWrapper,
    Banner,
  },
  data() {
    return {};
  },
  async mounted() {
    await this.$store.dispatch("getBanners");
    await this.changeShowPreloader();
  },
  name: "BannerSlider",
  computed: {
    ...mapGetters(["getBanners", "getImageUrl", "getPreloader"]),
  },
  methods: {
    ...mapMutations([
      "changeImageUrl",
      "changeImage",
      "addBanner",
      "changeShowPreloader",
    ]),
    ...mapActions(["save"]),
  },
};
</script>

<style lang="scss" scoped>
.button {
  text-align: center;
  margin-bottom: 30px;
  width: 100%;
}
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
