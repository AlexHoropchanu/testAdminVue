<template>
  <div>
    <div class="spinner-border" role="status" v-if="!preloader"></div>
    <div class="wrapper__banner row align-items-center">
      <div class="wrapper__banner__left col-lg-3">
        <label for=""><input type="radio" class="radio"> Фото на фоне</label><label for=""><input type="radio" class="radio">Просто фон</label>
        
      </div>
          <div class="wrapper__banner__right col-lg-9">
            <div class="wrapper" v-if="preloader">
      <img :src="card.imageUrl" alt="#" class="image-banner" /><br />
      <input
        type="file"
        style="display:none"
        accept="image/*"
        @change="onFilePicked"
        :id="card.id"
      />
      <label :for="card.id" class="btn btn-secondary">Upload</label><br />
          </div>
    </div>
      <button @click="save" :id="card.id" class="btn btn-danger col-lg-12">
        Сохранить</button
      ><br />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "CardBackgroundWrapper",
  data() {
    return {
      preloader: false,
      card: {
        type: false,
        imageUrl:
          "https://bipbap.ru/wp-content/uploads/2017/04/0_7c779_5df17311_orig.jpg",
        id: new Date(),
        newPick: "",
        oldPick: "",
      },
    };
  },
  async mounted() {
    const snapshot = await firebase
      .database()
      .ref("/banners/background")
      .once("value");
    console.log(snapshot);
    console.log(snapshot.val());
    const value = snapshot.val();
    console.log(value);
    if (value != null) {
      console.log(value);
      this.card.imageUrl = value.imageUrl;
      this.card.oldPick = value.imageUrl;
    }
    this.preloader = true;
  },
  methods: {
    onFilePicked(event) {
      const file = event.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      this.card.imageUrl = fileUrl;
      this.card.newPick = file;
    },
    async save() {
      if (this.card.newPick) {
        try {
          try {
            await firebase
              .storage()
              .refFromURL(this.card.oldPick)
              .delete();
            console.log(this.card.oldPick);
          } catch (e) {
            console.log("error");
          }
          const ref = firebase
            .storage()
            .ref("/banners/background/" + this.card.newPick.name);
          const snapshot = await ref.put(this.card.newPick);
          const downloadUrl = await snapshot.ref.getDownloadURL();
          console.log(downloadUrl);
          this.card.imageUrl = downloadUrl;
          this.card.oldPick = downloadUrl;
          this.state.newPic = "";
        } catch (e) {
          console.error(e);
        }
      }
      const fileDb = {
        imageUrl: this.card.imageUrl,
      };
      return await firebase
        .database()
        .ref("/banners/background")
        .set(fileDb);
    },
  },
};
</script>

<style lang="scss">
label{
  display: flex;
  width: 100%;
}
.radio{
  width: 10px;
  margin: 10px;
    height: 10px;
}
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
