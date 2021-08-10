<template>
  <div>
    <img :src="card.imageUrl" alt="#" class="w-50 h-50  " />
    <input
      type="file"
      style="display:none"
      ref="fileInput"
      accept="image/*"
      @change="onFilePicked"
      :id="card.id"
    />
    <label :for="card.id">Upload</label>
    <label><span>Url: </span><input type="text" :value="card.url"/></label>
    <label><span> Текст:</span> <input type="text" :value="card.text"/></label>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
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

      // this.changeImage(files[0]);
    },
  },
};
</script>

<style></style>
