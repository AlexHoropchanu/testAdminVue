<template>
  <div>
    <div class="spinner-border" role="status" v-if="!preloader"></div>
    <div class="wrapper__banner row align-items-center">
      <div class="wrapper__banner__left col-lg-3">
        <label for="">
          <input
            type="radio"
            class="radio"
            id="one"
            :value="true"
            v-model="card.picked"
          />
          Фото на фоне</label
        >
        <label for="">
          <input
            type="radio"
            class="radio"
            id="two"
            :value="false"
            v-model="card.picked"
          />Просто фон</label
        >
      </div>
      <div class="wrapper__banner__right col-lg-9">
        <div class="wrapper" v-if="preloader">
          <img :src="card.picked == false || card.imageUrl == ''? 'https://via.placeholder.com/1600x900.png' : card.imageUrl" alt="#" class="image-banner" /><br />
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
        picked: true,
        imageUrl:
          "",
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
    const value = snapshot.val();
    if (value != null) {
      this.card.imageUrl = value.imageUrl;
      this.card.oldPick = value.imageUrl;
      console.log(value)
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
      if(this.card.picked){
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
          this.card.newPic = "";
        } catch (e) {
          console.error(e);
        }
      }
      }
      else{
        try{
          await firebase
              .storage()
              .refFromURL(this.card.oldPick)
              .delete();
        }catch (e) {
            console.log("error");
          }
      }
      const fileDb = {
        imageUrl: this.card.imageUrl,
      };
      if(this.card.picked){
        try{
          return await firebase
        .database()
        .ref("/banners/background")
        .set(fileDb);
        }catch(e){
          console.log(e)
        }
      }else{
        return await firebase
        .database()
        .ref("/banners/background/imageUrl")
        .set('https://via.placeholder.com/1600x900.png');
      }
      
    },
  },
};
</script>

<style lang="scss">
label {
  display: flex;
  width: 100%;
}
.radio {
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
