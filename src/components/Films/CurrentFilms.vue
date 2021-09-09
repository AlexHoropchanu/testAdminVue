<template>
  <div class="wrapper">
    <div class=" current__films">
      <div class="component1">
        <div class="card ">
          <img :src="currentFilm.imageUrl" alt="#" />
          <b-button variant="danger">удалить</b-button>
          <b-button variant="warning" @click="rout">редактировать</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "currentFilm",
  data() {
    return {
      preloader: false,
    };
  },
  props: ["currentFilm", "index"],
  methods: {
    rout() {
      this.$router.push({ name: "EditFilm", params: { id: this.index } });
    },
  },
};
</script>

<style>
.component1 {
  display: flex;
  flex-wrap: wrap;
}
</style>
