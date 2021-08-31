<template>
  <div class="wrapper">
    <img :src="card.imageUrl" alt="#" class="image-banner" /><br />
    <input
      type="file"
      style="display:none"
      ref="fileInput"
      accept="image/*"
      @change="onFilePicked"
      :id="card.id"
    />
    <label :for="card.id" class="btn btn-secondary">Upload</label><br />
    <label><span>Url: </span><input type="text" v-model="card.url"/></label
    ><br />
    <label><span> Текст:</span> <input type="text" v-model="card.text"/></label
    ><br />
    <button @click="deleteBanner" :id="card.id" class="btn btn-danger">
      Удалить</button
    ><br />
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  name: "Banner",
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations(["changeImageUrl"]),
    ...mapActions(["deleteBanner"]),
    onFilePicked(event) {
      const files = {
        pictures: event.target.files[0],
        id: this.card.id,
        url: this.card.url,
        text: this.card.text,
      };
      const fileUrl = URL.createObjectURL(event.target.files[0]);
      this.card.imageUrl = fileUrl;
      this.changeImageUrl(files);
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
