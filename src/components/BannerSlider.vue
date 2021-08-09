<template>
  <div>
    <div class="top__block">
      <ul>
        <li class="col-lg-3 " v-for="banner in getBanners" :key="banner.id">
          <img :src="getImageUrl" alt="#" />
          <!-- <img
            v-if="getImageUrl === null"
            src="https://s1.1zoom.ru/big0/697/Love_Night_Moon_Trees_Silhouette_Two_Dating_576752_1280x853.jpg"
          /> -->
          <input
            type="file"
            style="display:none"
            ref="fileInput"
            accept="image/*"
            @change="onFilePicked"
          />
          <button @click="onPickFile">upload image</button>
          <label
            ><span> Url: </span><input type="text" :value="banner.url"
          /></label>
          <label
            ><span> Текст:</span> <input type="text" :value="banner.text"
          /></label>
          <button @click="save">save</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      // imageUrl: "",
      // image: null,
    };
  },
  name: "BannerSlider",
  computed: {
    ...mapGetters(["getBanners", "getImageUrl"]),
  },
  methods: {
    ...mapMutations(["changeImageUrl", "changeImage"]),
    ...mapActions(["save"]),
    onPickFile() {
      this.$refs.fileInput[0].click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let fileName = files[0].name;
      if (fileName.lastIndexOf(".") <= 0) {
        return alert("Выберите картинку с расширением");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.changeImageUrl(fileReader.result);
        // вызвать мутации
      });
      fileReader.readAsDataURL(files[0]);
      this.changeImage(files[0]);
    },
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
