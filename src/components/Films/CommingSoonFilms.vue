<template>
  <div class="wrapper">
    <div class=" current__films">
      <div class="component2">     
      <div class="card">
        <img
          :src="commingSoonFilm.imageUrl"
          alt="#"
        />
        <button class="dangger">удалить</button>
        <button>редактировать</button></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommingSoonFilms",
  data() {
    return {
      preloader: false,
    };
  },
  props:['commingSoonFilm']

};
</script>

<style>
.component2{
  display: flex;
  flex-wrap: wrap;
}
</style>
