<template>
<section>
<div class="content-header">
        <div class="container-fluid">
        <div class="row mb-2">
          <h1 class="mx-auto my-0">Кинотеатры</h1>
        </div>
      </div>
</div>
<section class="content">
  <div class="container-fluid">
    <b-row>
          <b-col>
            <b-card class="pb-0">
              <h4>Список кинотеатров</h4>
              <div
                v-if="!loaded"
                class="spinner-border" role="status"
              ></div>
              <b-card-body class="pb-0" v-else>
                <b-row>
                  <b-col
                    v-for="(cinema, index) in cinemas"
                    :key="index"
                    lg="3"
                    md="4"
                    sm="6"
                    cols="12"
                  >
                    <b-card
                      bg-variant="light"
                      :title="cinema.ru.title"
                      :img-src="
                        cinema.ru.headImgUrl == ''
                          ? 'https://via.placeholder.com/1600x900.png'
                          : cinema.ru.headImgUrl
                      "
                    >
                      <b-card-body class="px-0">
                        <b-button
                          class="mt-3"
                          variant="warning"
                          block
                          pill
                          :to="{
                            name: 'CardCinema',
                            params: { id: index },
                          }"
                        >
                          Редактировать
                        </b-button>
                        <b-button
                          block
                          pill
                          class="mx-auto"
                          @click="remove(cinema.id)"
                          variant="danger"
                          >Удалить</b-button
                        >
                      </b-card-body>
                    </b-card>
                  </b-col>
                </b-row>

                <b-container class="text-center w-100 mb-0 mt-3">
                  <b-button @click="add()" variant="info"
                    >ДОБАВИТЬ</b-button
                  >
                </b-container>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
  </div>
</section>
</section>
</template>

<script>
import { saveDb, getData, deleteStorage } from "@/modules/firebase";
export default {
  name: "AllCinemas",
  data: () => ({
    loaded: false,
    cinemas: [],
  }),
 async mounted(){
    if ((await getData("/cinemas")) != null) {
      this.cinemas= await getData("/cinemas");
    }
    this.loaded = true;
  },
  methods:{
    async add() {
      this.cinemas.push({
        id: `${Date.now()}_${Math.floor(Math.random() * 90000) + 10000}`,
        ru: {
          title: "",
          description: "",
          conditions:'',
          logoImgUrl:'',
          headImgUrl: "",
          gallery: ["", "", "", ""],
          hyperlink: "",
          type: {
            d2: true,
            d3: false,
            imax: false,
          },
          seo: {
            url: "",
            title: "",
            keywords: "",
            description: "",
          },
        },
        ua: {
          title: "",
          description: "",
          logoImgUrl:'',
          headImgUrl: "",
          gallery: ["", "", "", ""],
          hyperlink: "",
          type: {
            d2: true,
            d3: false,
            imax: false,
          },
          seo: {
            url: "",
            title: "",
            keywords: "",
            description: "",
          },
        },
      });
      await saveDb("/cinemas", this.cinemas);
      this.$router.push({
        name: "CardCinema",
        params: { id: `${this.cinemas.length - 1}` },
      });
    },
        findId(index, type) {
      return this.cinemas.indexOf(this[type][index]);
    },
        getKey(index) {
      let key;
      for (let idx = 0; idx < this.cinemas.length; idx++) {
        const element = this.cinemas[idx];
        if (element.id == index) {
          key = idx;
        }
      }
      return key;
    },
        async removeBannersFromStorage(key) {
      //Remove russian Banner from storage
      if (this.cinemas[key].ru.headImgUrl != "") {
        try {
          await deleteStorage(this.cinemas[key].ru.headImgUrl);
          console.log(
            "[SUCCESS]\n",
            this.cinemas[key].ru.headImgUrl,
            "removed from storage"
          );
        } catch (e) {
          console.log("Error", e);
        }
      }
      //Remove ukrainian Banner from storage
      if (this.cinemas[key].ua.headImgUrl != "") {
        try {
          await deleteStorage(this.cinemas[key].ua.headImgUrl);
          console.log(
            "[SUCCESS]\n",
            this.cinemas[key].ua.headImgUrl,
            "removed from storage"
          );
        } catch (e) {
          console.log("Error", e);
        }
      }
    },
        async remove(index) {
      console.log("removing");
      const answer = window.confirm("Вы хотите удалить кинотеатр?"); // Алерт с отменой
      if (!answer) {
        return;
      }
      let key = this.getKey(index);
      console.log(key)
      console.log("Удаление кинотетара");
      this.removingState = "кинотеатр удален";
      await this.removeBannersFromStorage(key);
      console.log("Removing galleries");
      this.removingState = "Галереи удалены";
      await this.removeGalleriesFromStorage(key);
      this.cinemas = this.cinemas.filter((t) => this.cinemas.indexOf(t) != key);
      this.removingState = "Записи в базе данных удалены";
      await saveDb("/cinemas", this.cinemas);
      this.removingState = "";
    },
    async removeGalleriesFromStorage(key) {
      for (var i = 0; i < this.cinemas[key].ru.gallery.length; i++) {
        if (this.cinemas[key].ru.gallery[i] != "") {
          try {
            await deleteStorage(this.cinemas[key].ru.gallery[i]);
            console.log(
              "[SUCCESS]\n",
              this.cinemas[key].ru.gallery[i],
              "removed from storage"
            );
          } catch (e) {
            console.log("Error:", e);
          }
        }
      }
      //Remove ukrainian Gallery
      for (var q = 0; q < this.cinemas[key].ua.gallery.length; q++) {
        if (this.cinemas[key].ua.gallery[q] != "") {
          try {
            await deleteStorage(this.cinemas[key].ua.gallery[q]);
            console.log(
              "[SUCCESS]\n",
              this.cinemas[key].ua.gallery[i],
              "removed from storage"
            );
          } catch (e) {
            console.log("Error:", e);
          }
        }
      }
    },
  }
};
</script>

<style></style>
