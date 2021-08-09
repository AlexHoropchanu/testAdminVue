import firebase from "firebase/app";
export default {
  state: {
    email: "d@gmail.com",
    password: "111111",
    isShowed: false,
  },
  mutations: {
    updateEmail(state, email) {
      state.email = email;
    },
    updatePassword(state, password) {
      state.password = password;
    },
    updateIsShowed(state) {
      state.isShowed = true;
    },
  },
  actions: {
    async login() {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(
            this.state.login.email,
            this.state.login.password
          );
        this.commit("updateIsShowed");
      } catch (error) {
        console.log("pezdos");
      }
    },
  },
  getters: {
    getEmail(state) {
      return state.email;
    },
    getPassword(state) {
      return state.password;
    },
  },
};
