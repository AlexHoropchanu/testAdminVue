<template>
  <div class="wrapper">
    <div class=" current__films">
      <div class="component1">     

      <div class="card ">
        <img
          :src="currentFilm.imageUrl"
          alt="#"
        />
        <button class="dangger">удалить</button>
        <button @click="rout">редактировать</button></div>
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
    props:['currentFilm'],
    methods:{
      rout(){
        this.$router.push('films/edit')
      }
    }
};
</script>

<style>
.component1{
  display: flex;
  flex-wrap: wrap;
}
</style>
