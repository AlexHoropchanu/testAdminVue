<template>
  <article>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <h1 class="mx-auto my-0">Фильмы</h1>
        </div>
      </div>
    </div>
    <section class="content">
      <div class="container-fluid">
        <b-row>
          <b-col>
            <b-card class="pb-0">
              <h4>Список текущих фильмов</h4>
              <div
                v-if="!loaded"
                class="spinner-border" role="status"
              ></div>
              <b-card-body class="pb-0" v-else>
                <b-row>
                  <b-col
                    v-for="(film, index) in curfilms"
                    :key="index"
                    lg="3"
                    md="4"
                    sm="6"
                    cols="12"
                  >
                    <b-card
                      bg-variant="light"
                      :title="film.ru.title"
                      :img-src="
                        film.ru.headImgUrl == ''
                          ? 'https://via.placeholder.com/1600x900.png'
                          : film.ru.headImgUrl
                      "
                    >
                      <b-card-body class="px-0">
                        <b-button
                          class="mt-3"
                          variant="warning"
                          block
                          pill
                          :to="{
                            name: 'Edit',
                            params: { id: findId(index, 'curfilms') },
                          }"
                        >
                          Редактировать
                        </b-button>
                        <b-button
                          block
                          pill
                          class="mx-auto"
                          @click="remove(film.id)"
                          variant="danger"
                          >Удалить</b-button
                        >
                      </b-card-body>
                    </b-card>
                  </b-col>
                </b-row>

                <b-container class="text-center w-100 mb-0 mt-3">
                  <b-button @click="add('current')" variant="info"
                    >ДОБАВИТЬ</b-button
                  >
                </b-container>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-card class="pb-0">
              <h4>Список фильмов которые скоро покажут</h4>
              <div
                v-if="!loaded"
                class="spinner-border" role="status"
              ></div>
              <b-card-body class="pb-0" v-else>
                <b-row>
                  <b-col
                    v-for="(film, index) in soonfilms"
                    :key="index"
                    lg="3"
                    md="4"
                    sm="6"
                    cols="12"
                  >
                    <b-card
                      bg-variant="light"
                      :title="film.ru.title"
                      :img-src="
                        film.ru.headImgUrl == ''
                          ? 'https://via.placeholder.com/1600x900.png'
                          : film.ru.headImgUrl
                      "
                    >
                      <b-card-body class="px-0">
                        <b-button
                          class="mt-3"
                          variant="warning"
                          block
                          pill
                          :to="{
                            name: 'Edit',
                            params: { id: findId(index, 'soonfilms') },
                          }"
                        >
                          Редактировать
                        </b-button>
                        <b-button
                          block
                          pill
                          class="mx-auto"
                          @click="remove(film.id)"
                          variant="danger"
                          >Удалить</b-button
                        >
                      </b-card-body>
                    </b-card>
                  </b-col>
                </b-row>
                <b-container class="text-center w-100 mb-0 mt-3">
                  <b-button @click="add('soon')" variant="info"
                    >ДОБАВИТЬ</b-button
                  >
                </b-container>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </section>
  </article>
</template>

<script>
import { getData, saveDb, deleteStorage } from "@/modules/firebase";
export default {
  name: "AllFilms",
  async mounted() {
    if ((await getData("/films")) != null) {
      this.films = await getData("/films");
    }
    this.loaded = true;
  },
  data: () => ({
    loaded: false,
    films: [],
  }),
  computed: {
    curfilms() {
      return this.films.filter((t) => t.type == "current");
    },
    soonfilms() {
      return this.films.filter((t) => t.type == "soon");
    },
  },
  methods: {
    findId(index, type) {
      return this.films.indexOf(this[type][index]);
    },
    async add(type) {
      this.films.push({
        id: `${Date.now()}_${Math.floor(Math.random() * 90000) + 10000}`,
        type,
        ru: {
          title: "",
          description: "",
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
      await saveDb("/films", this.films);
      this.$router.push({
        name: "Edit",
        params: { id: `${this.films.length - 1}` },
      });
    },
    makeToast() {
      this.$bvToast.toast(this.removingState, {
        title: "Успех",
        autoHideDelay: 1000,
        variant: "success",
        solid: true,
      });
    },
    getKey(index) {
      let key;
      for (let idx = 0; idx < this.films.length; idx++) {
        const element = this.films[idx];
        if (element.id == index) {
          key = idx;
        }
      }
      return key;
    },
    async remove(index) {
      console.log("removing");
      const answer = window.confirm("Вы хотите удалить фильм?"); // Алерт с отменой
      if (!answer) {
        return;
      }
      let key = this.getKey(index);
      console.log("Удаление баннеров");
      this.removingState = "Баннеры удалены";
      await this.removeBannersFromStorage(key);
      this.makeToast();
      console.log("Removing galleries");
      this.removingState = "Галереи удалены";
      await this.removeGalleriesFromStorage(key);
      this.makeToast();
      console.log("Filtering films array locally");
      console.log("###\nBefore", this.films);
      this.films = this.films.filter((t) => this.films.indexOf(t) != key);
      console.log("###\nAfter", this.films);
      console.log("Writing to db");
      this.removingState = "Записи в базе данных удалены";
      await saveDb("/films", this.films);
      this.makeToast();
      this.removingState = "";
    },
    async removeBannersFromStorage(key) {
      //Remove russian Banner from storage
      if (this.films[key].ru.headImgUrl != "") {
        try {
          await deleteStorage(this.films[key].ru.headImgUrl);
          console.log(
            "[SUCCESS]\n",
            this.films[key].ru.headImgUrl,
            "removed from storage"
          );
        } catch (e) {
          console.log("Error", e);
        }
      }
      //Remove ukrainian Banner from storage
      if (this.films[key].ua.headImgUrl != "") {
        try {
          await deleteStorage(this.films[key].ua.headImgUrl);
          console.log(
            "[SUCCESS]\n",
            this.films[key].ua.headImgUrl,
            "removed from storage"
          );
        } catch (e) {
          console.log("Error", e);
        }
      }
    },
    async removeGalleriesFromStorage(key) {
      //Remove russian Gallery
      for (var i = 0; i < this.films[key].ru.gallery.length; i++) {
        if (this.films[key].ru.gallery[i] != "") {
          try {
            await deleteStorage(this.films[key].ru.gallery[i]);
            console.log(
              "[SUCCESS]\n",
              this.films[key].ru.gallery[i],
              "removed from storage"
            );
          } catch (e) {
            console.log("Error:", e);
          }
        }
      }
      //Remove ukrainian Gallery
      for (var q = 0; q < this.films[key].ua.gallery.length; q++) {
        if (this.films[key].ua.gallery[q] != "") {
          try {
            await deleteStorage(this.films[key].ua.gallery[q]);
            console.log(
              "[SUCCESS]\n",
              this.films[key].ua.gallery[i],
              "removed from storage"
            );
          } catch (e) {
            console.log("Error:", e);
          }
        }
      }
    },
  },
};
</script>
<style>
.card > .card-body {

  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
