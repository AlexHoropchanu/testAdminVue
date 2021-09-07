<template>
  <div class="top__block">
    <div class="spinner-border" role="status" v-if="!showPreloader"></div>
    <div class="top banner">
      <h3 style="text-align: center">На главной новости внизу</h3>
      <ul v-if="showPreloader" class="list__banner">
        <BannerNews
          class="col-lg-3"
          :banner="banner"
          :banners="banners"
          :saveImages="saveImages"
          v-for="banner in banners"
          :key="banner.id"
        >
        </BannerNews>
      </ul>
      <button @click="save" class="btn btn-primary button">save</button>
      <div @click="addBanner" class="btn btn-primary button">
        Добавить баннер
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import BannerNews from "../banners/BannerNews.vue";
export default {
  name: "CardNewsWrapper",
  data() {
    return {
      banners: [],
      saveImages: [],
      showPreloader: true,
    };
  },
  components: {
    BannerNews,
  },
  async mounted() {
    const snapshot = await firebase
      .database()
      .ref("banners/news")
      .once("value");
    if ((await snapshot.val()) === null) {
      console.log(await snapshot.val());
      this.banners = [];
    } else {
      this.banners = await snapshot.val();
    }
  },
  methods: {
    addBanner() {
      this.banners.push({
        imageUrl:
          "https://s1.1zoom.ru/big0/697/Love_Night_Moon_Trees_Silhouette_Two_Dating_576752_1280x853.jpg",
        id: Date.now(),
        url: "",
      });
      console.log(this.banners);
    },
    async save() {
      if (this.saveImages != 0) {
        console.log(this.saveImages);
        try {
          for (let el = this.saveImages.length - 1; el >= 0; el--) {
            let fl = this.saveImages[el];
            const ref = firebase
              .storage()
              .ref(`banners/news/ ${fl.pictures.name}`);
            const snapshot = await ref.put(fl.pictures);
            const downloadUrl = await snapshot.ref.getDownloadURL();
            this.banners.filter(
              (el) => el.id == fl.id
            )[0].imageUrl = downloadUrl;
          }
        } catch {
          console.log("err");
        }
      }
      return firebase
        .database()
        .ref("banners/news")
        .set(this.banners);
    },
  },
};
</script>

<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
}
.image-banner {
  width: 100%;
}
img {
  width: 100%;
  height: 220px;
}
input {
  width: 100%;
  padding: 10px 20px;
}
.button {
  text-align: center;
  margin-bottom: 30px;
  width: 100%;
}
.list__banner {
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
</style>
