<template>
  <section>
      <div
                v-if="!loaded"
                class="spinner-border" role="status"
              ></div>
      <section v-else>
             <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <h1 class="mx-auto my-0">Редактирование кинотеатра</h1>
        </div>
      </div>
    </div>
      </section>
     <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <b-card no-body>
              <b-tabs card>
                <b-tab
                  v-for="(item, key) in cinemas"
                  :key="key"
                  :title="whichLang(key)"
                >
                <b-card-text>
                    <b-form-group
                      label="Название кинотеатра"
                      :label-for="'title-' + key"
                    >
                      <b-form-input
                        :id="'title-' + key"
                        v-model="item.title"
                        placeholder="Введите название кинотеатра"
                        class="col-lg-4 col-md-6 col-12"
                      />
                    </b-form-group>
                    <b-form-group
                      label="Описание кинотеатра"
                      :label-for="'description-' + key"
                    >
                      <b-form-textarea
                        :id="'description-' + key"
                        v-model="item.description"
                        placeholder="Введите описание кинотеатра"
                        class="col-lg-6 col-md-8 col-12"
                      />
                    </b-form-group>
                    <b-form-group
                      label="Условия кинотеатра"
                      :label-for="'conditions-' + key"
                    >
                      <b-form-textarea
                        :id="'conditions-' + key"
                        v-model="item.conditions"
                        placeholder="Введите условия кинотеатра"
                        class="col-lg-6 col-md-8 col-12"
                      />
                    </b-form-group>
                      <b-form-group
                      label="Логотип кинотеатра"
                      :label-for="'Logo-' + key"
                    >
                      <b-form-file
                        class="col-lg-6 col-md-8 col-12"
                        accept="image/*"
                        browse-text="Выбрать файл"
                        @change="bannerPreview(key, $event)"
                        :id="'Logo-' + key"
                      />
                      <b-button
                        v-if="item.headImgUrl != ''"
                        class="ml-2"
                        pill
                        @click="bannerClear(key)"
                        variant="danger"
                        >Удалить</b-button
                      >
                      <br />
                      <b-container class="col-lg-6 col-md-8 col-12 ml-0 mt-1">
                        <b-img
                          fluid
                          :src="
                            item.headImgUrl
                              ? item.headImgUrl
                              : 'https://via.placeholder.com/1600x900.png'
                          "
                        />
                      </b-container>
                    </b-form-group>
                                          <b-form-group
                      label="Фото верхнего банера"
                      :label-for="'Logo-' + key"
                    >
                      <b-form-file
                        class="col-lg-6 col-md-8 col-12"
                        accept="image/*"
                        browse-text="Выбрать файл"
                        @change="bannerPreview(key, $event)"
                        :id="'Logo-' + key"
                      />
                      <b-button
                        v-if="item.headImgUrl != ''"
                        class="ml-2"
                        pill
                        @click="bannerClear(key)"
                        variant="danger"
                        >Удалить</b-button
                      >
                      <br />
                      <b-container class="col-lg-6 col-md-8 col-12 ml-0 mt-1">
                        <b-img
                          fluid
                          :src="
                            item.headImgUrl
                              ? item.headImgUrl
                              : 'https://via.placeholder.com/1600x900.png'
                          "
                        />
                      </b-container>
                    </b-form-group>
                </b-card-text>
                </b-tab>
                  </b-tabs>
                  </b-card>
                  </div>
                  </div>
                  </div>
      </section>
  </section>
</template>

<script>
import { getData } from "@/modules/firebase";
export default {
name: 'CardCinema', 
data() {
    return {
        loaded:false,
        cinemasFull:{},
        path: `/cinemas/${this.$route.params.id}`,
        bannerRemove: { ru: "", ua: "" },
        bannerWrite: { ru: "", ua: "" },
    }
},
computed:{
        cinemas() {
      return { ru: this.cinemasFull.ru, ua: this.cinemasFull.ua };
    },
},

async mounted() {
    this.loaded = false;
    if ((await getData(this.path)) != null) {
      this.cinemasFull = await getData(this.path);
    } else {
      this.$router.push({ name: "AllCinemas" });
    }
    this.loaded = true;
},
methods:{
        whichLang(key) {
      if (key == "ua") {
        return "Українська";
      } else {
        return "Русский";
      }
    },
    bannerPreview(lang, event) {
      const file = event.target.files[0];
      if (
        this.cinemasFull[lang].headImgUrl != "" &&
        this.cinemasFull[lang].headImgUrl[0] != "b"
      ) {
        this.bannerRemove[lang] = this.cinemasFull[lang].headImgUrl;
      }
      this.$set(this.cinemasFull[lang], "headImgUrl", URL.createObjectURL(file));
      this.bannerWrite[lang] = file;
    },
     bannerClear(lang) {
      //Проверка на BLOB
      if (this.cinemasFull[lang].headImgUrl[0] != "b") {
        this.bannerRemove[lang] = this.cinemasFull[lang].headImgUrl;
      }
      this.$set(this.cinemasFull[lang], "headImgUrl", ""); //Для реактивности (1: выбираем обьект 2: выбираем ключ 3: на что меняем)
    },
}
}
</script>

<style>

</style>