<template>
  <div class="wrapper">
    <img :src="banner.imageUrl" alt="#" class="image-banner" /><br />
    <input
      type="file"
      style="display:none"
      ref="fileInput"
      accept="image/*"
      @change="onFilePicked"
      :id="banner.id"
    />
    <label :for="banner.id" class="btn btn-secondary">Upload</label><br />
    <label><span>Url: </span><input type="text" v-model="banner.url"/></label
    ><br />
    <button @click="deleteBanner" :id="banner.id" class="btn btn-danger">
      Удалить</button
    ><br />
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "BannerNews",
  props: ["banner", "saveImages", "banners"],
  methods: {
    // ...mapMutations(["changeImageUrl"]),
    // ...mapActions(["deleteBanner"]),
    async deleteBanner(payload) {
      await this.banners.forEach((element, index, object) => {
        if (element.id == payload.target.id) {
          object.splice(index, 1);
          console.dir(element.imageUrl);
          const ref = firebase.storage().refFromURL(element.imageUrl);
          ref.delete();
        }
      });
      return firebase
        .database()
        .ref("banners/news")
        .set(this.banners);
    },
    onFilePicked(event) {
      const files = {
        pictures: event.target.files[0],
        id: this.banner.id,
        url: this.banner.url,
      };
      const fileUrl = URL.createObjectURL(event.target.files[0]);
      this.banner.imageUrl = fileUrl;
      this.saveImages.push(files);
      console.log(event.target.files[0]);

      // this.changeImage(files[0]);
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
</style>
