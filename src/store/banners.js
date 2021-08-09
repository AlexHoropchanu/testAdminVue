import firebase from "firebase";
export default {
  state: {
    imageUrl:
      "https://s1.1zoom.ru/big0/697/Love_Night_Moon_Trees_Silhouette_Two_Dating_576752_1280x853.jpg",
    image: null,
    //нужно добавить массив новых банеров и пушить в масив имеющихся банеров
    banners: [
      {
        id: 1,
        // src: "https://bayguzin.ru/assets/cache_image/2014/07/.webp",
        url: "d",
        text: "a",
      },
    ],
  },
  getters: {
    getBanners(state) {
      return state.banners;
    },
    getImageUrl(state) {
      return state.imageUrl;
    },
    getImage(state) {
      return state.image;
    },
  },
  mutations: {
    changeImageUrl(state, payload) {
      state.imageUrl = payload;
      console.log(state.imageUrl);
    },
    cleareImageUrl(state) {
      state.imageUrl = "";
    },
    changeImage(state, payload) {
      state.image = payload;
      console.log(state.image);
    },
  },
  actions: {
    save() {
      firebase
        .storage()
        .ref(`banners/ ${this.state.banners.image.name}`)
        .put(this.state.banners.image);
    },
  },
};
