<template>
  <div class="wrapper">
    <h1>Фильмы</h1>
    <div class=" current__films">
      <div class="component1">
        <h2 class="col-lg-12">Текущие фильмы</h2>
        <CurrentFilms
          class="col-lg-3"
          :currentFilm="currentFilm"
          :index="index"
          v-for="(currentFilm, index) in currentFilms"
          :key="index"
        >
        </CurrentFilms>
      </div>
      <b-button variant="primary" @click="addCurrentFilm">Добавить фильм</b-button>
    </div>
    <div class="comming__soon ">
      <div class="component2 ">
        <h2 class="col-lg-12">Фильмы которые скоро покажут</h2>
        <CommingSoonFilms
          class="col-lg-3"
          :commingSoonFilm="commingSoonFilm"
          v-for="commingSoonFilm in commingSoonFilms"
          :key="commingSoonFilm.id"
        >
        </CommingSoonFilms>
      </div>
      <b-button variant="primary" @click="addCommingSoonFilm">Добавить фильм</b-button>
    </div>
  </div>
</template>

<script>
import CurrentFilms from "../Films/CurrentFilms";
import CommingSoonFilms from "./CommingSoonFilms.vue";
export default {
  name: "Films",
  components: {
    CurrentFilms,
    CommingSoonFilms,
  },

  data() {
    return {
      preloader: false,
      currentFilms: [],
      commingSoonFilms: [],
    };
  },
  methods: {
    addCurrentFilm() {
      this.currentFilms.push({
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKrMPlr-tRfkWvbLpBL4U7lQN9gqVBZWIbJAMlacpfaPqBUg_3zn3uNJJ7gHYmNs3z8pM&usqp=CAU",
        id: Date.now(),
        url: "",
        text: "",
      });
      console.log(this.currentFilms);
    },
    addCommingSoonFilm() {
      this.commingSoonFilms.push({
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKrMPlr-tRfkWvbLpBL4U7lQN9gqVBZWIbJAMlacpfaPqBUg_3zn3uNJJ7gHYmNs3z8pM&usqp=CAU",
        id: Date.now(),
        url: "",
        text: "",
      });
      console.log(this.commingSoonFilms);
    },
  },
};
</script>

<style></style>
