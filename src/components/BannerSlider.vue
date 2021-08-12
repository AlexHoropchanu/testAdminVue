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
      <button @click="save" class="btn btn-primary button">save</button>
      <div @click="addBanner" class="btn btn-primary button">Добавить баннер</div>
    </div>
    <div class="spinner-border" role="status">

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
.button{
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
