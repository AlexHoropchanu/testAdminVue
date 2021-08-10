import firebase from "firebase";
export default {
  state: {
    saveImages: [],
    banners: [],
  },
  getters: {
    getBanners(state) {
      return state.banners;
    },
    getImageUrl(state) {
      return state.banners.imageUrl;
    },
    // getImage(state) {
    //   return state.image;
    // },
  },
  mutations: {
    addBanner(state) {
      state.banners.push({
        imageUrl:
          "https://s1.1zoom.ru/big0/697/Love_Night_Moon_Trees_Silhouette_Two_Dating_576752_1280x853.jpg",
        id: Date.now(),
        url: "d",
        text: "a",
      });
      // console.log(state.banners);
    },
    setImages(state, payload) {
      state.saveImages = payload;
    },
    changeImageUrl(state, payload) {
      state.saveImages.push(payload);
      // state.banners[payload.id].imageUrl = payload.fileUrl;
    },
    cleareImageUrl(state) {
      state.imageUrl = "";
    },
    ubdateImgeUrl(state, payload) {
      state.banners.filter((el) => el.id == payload.id)[0].imageUrl =
        payload.downloadUrl;
    },
    setBanners(state, payload) {
      if (payload === null) {
        state.banners = [];
      } else {
        state.banners = payload;
      }
    },
  },
  actions: {
    async save(context) {
      if (context.state.saveImages != 0) {
        try {
          for (let el = context.state.saveImages.length - 1; el >= 0; el--) {
            let fl = context.state.saveImages[el];
            const ref = firebase.storage().ref(`banners/ ${fl.pictures.name}`);
            const snapshot = await ref.put(fl.pictures);
            const downloadUrl = await snapshot.ref.getDownloadURL();
            context.commit("ubdateImgeUrl", { downloadUrl, id: fl.id });
          }
        } catch {
          console.log("err");
        }
      }
      //.delete() удаление со сторейдж .set перезаписываем датабейс
      return firebase
        .database()
        .ref("banners")
        .set(context.state.banners);
    },
    async getBanners(context) {
      const snapshot = await firebase
        .database()
        .ref("banners")
        .once("value");
      const bannersObj = snapshot.val();
      context.commit("setBanners", bannersObj);
    },
  },
};
