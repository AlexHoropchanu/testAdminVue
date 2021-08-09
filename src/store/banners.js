export default {
  state: {
    banners: [
      {
        id: 1,
        src:
          "https://bayguzin.ru/assets/cache_image/2014/07/zaglushka_html5_1024x0_326.webp",
        url: "d",
        text: "a",
      },
    ],
  },
  getters: {
    getBanners(state) {
      return state.banners;
    },
  },
  mutations: {},
  actions: {},
};
