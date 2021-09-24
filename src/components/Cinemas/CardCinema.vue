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
                        @change="bannerPreviewLogo(key, $event)"
                        :id="'Logo-' + key"
                      />
                      <b-button
                        v-if="item.logoImgUrl != ''"
                        class="ml-2"
                        pill
                        @click="bannerClearLogo(key)"
                        variant="danger"
                        >Удалить</b-button
                      >
                      <br />
                      <b-container class="col-lg-6 col-md-8 col-12 ml-0 mt-1">
                        <b-img
                          fluid
                          :src="
                            item.logoImgUrl
                              ? item.logoImgUrl
                              : 'https://via.placeholder.com/1600x900.png'
                          "
                        />
                      </b-container>
                    </b-form-group>
                                          <b-form-group
                      label="Фото верхнего банера"
                      :label-for="'header-' + key"
                    >
                      <b-form-file
                        class="col-lg-6 col-md-8 col-12"
                        accept="image/*"
                        browse-text="Выбрать файл"
                        @change="bannerPreviewHeader(key, $event)"
                        :id="'header-' + key"
                      />
                      <b-button
                        v-if="item.headImgUrl != ''"
                        class="ml-2"
                        pill
                        @click="bannerClearHeader(key)"
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
                      <b-container class="mt-3">
                      <b-row>
                        <b-col>
                          <b-card title="Галерея картинок">
                            <b-card-text>
                              <b-container class="pt-2">
                                <b-row>
                                  <b-col
                                    v-for="(galleryItem, index) in item.gallery"
                                    :key="index"
                                    lg="3"
                                    md="6"
                                    col
                                  >
                                    <b-card
                                      img-top
                                      :img-src="
                                        galleryItem
                                          ? galleryItem
                                          : 'https://via.placeholder.com/1600x900.png'
                                      "
                                    >
                                      <b-card-text>
                                        <b-form-file
                                          placeholder=""
                                          browse-text="Выбрать файл"
                                          accept="image/*"
                                          @change="
                                            galleryPreview(index, key, $event)
                                          "
                                        />
                                        <b-button
                                          v-if="galleryItem"
                                          class="mx-auto mt-2"
                                          pill
                                          block
                                          variant="danger"
                                          @click="galleryClear(index, key)"
                                          >Удалить</b-button
                                        >
                                      </b-card-text>
                                    </b-card>
                                  </b-col>
                                </b-row>
                              </b-container>
                            </b-card-text>
                          </b-card>
                        </b-col>
                      </b-row>
                    </b-container>
                    </b-form-group>
                      <b-form-group label="SEO">
                      <b-container class="ml-3">
                        <b-form-group label="URL" :label-for="'seo-url-' + key">
                          <b-form-input
                            :id="'seo-url-' + key"
                            v-model="item.seo.url"
                            placeholder="URL"
                            class="col-lg-6 col-md-8 col"
                          />
                        </b-form-group>
                        <b-form-group
                          label="Title"
                          :label-for="'seo-title-' + key"
                        >
                          <b-form-input
                            :id="'seo-title-' + key"
                            v-model="item.seo.title"
                            placeholder="Title"
                            class="col-lg-6 col-md-8 col"
                          />
                        </b-form-group>
                        <b-form-group
                          label="Description"
                          :label-for="'seo-description-' + key"
                        >
                          <b-form-textarea
                            :id="'seo-description-' + key"
                            v-model="item.seo.description"
                            placeholder="Description"
                            class="col-lg-6 col-md-8 col"
                          />
                        </b-form-group>
                        <b-form-group
                          label="Keywords"
                          :label-for="'seo-keywords-' + key"
                        >
                          <b-form-input
                            :id="'seo-keywords-' + key"
                            v-model="item.seo.keywords"
                            placeholder="Keywords"
                            class="col-lg-6 col-md-8 col"
                          />
                        </b-form-group>
                      </b-container>
                    </b-form-group>
                    <b-container class="text-center">
                      <b-button variant="info" @click="save" >save Cinema</b-button>
                      <p class="mt-5 mb-1" v-if="loadingState != ''">
                        {{ loadingState }}
                      </p>
                      <b-progress
                        v-if="loadingAll != 0"
                        class="mt-0"
                        :value="loadingLeft"
                        :max="loadingAll"
                        height="2px"
                      >
                      </b-progress>
                      <b-progress
                        v-if="removingAll != 0"
                        class="mt-0"
                        :value="removingLeft"
                        :max="removingAll"
                        variant="danger"
                        height="2px"
                      >
                      </b-progress>
                    </b-container>
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
import { getData, saveDb, saveStorage, deleteStorage } from "@/modules/firebase";
export default {
name: 'CardCinema', 
data() {
    return {
        loaded:false,
        cinemasFull:{},
        path: `/cinemas/${this.$route.params.id}`,
        bannerRemove: { ru: "", ua: "" },
        bannerWrite: { ru: "", ua: "" },
              galleryRemove: { ru: ["", "", "", ""], ua: ["", "", "", ""] },
      galleryWrite: { ru: ["", "", "", ""], ua: ["", "", "", ""] },
            loadingState: "",
                  loadingAll: 0,
      loadingLeft: 0,
      removingAll: 0,
      removingLeft: 0,
            uploading: false,
                  saved: false,
                        success: false,
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
    bannerPreviewHeader(lang, event) {
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
     bannerClearHeader(lang) {
      //Проверка на BLOB
      if (this.cinemasFull[lang].headImgUrl[0] != "b") {
        this.bannerRemove[lang] = this.cinemasFull[lang].headImgUrl;
      }
      this.$set(this.cinemasFull[lang], "headImgUrl", ""); //Для реактивности (1: выбираем обьект 2: выбираем ключ 3: на что меняем)
    },
        bannerPreviewLogo(lang, event) {
      const file = event.target.files[0];
      if (
        this.cinemasFull[lang].logoImgUrl != "" &&
        this.cinemasFull[lang].logoImgUrl[0] != "b"
      ) {
        this.bannerRemove[lang] = this.cinemasFull[lang].logoImgUrl;
      }
      this.$set(this.cinemasFull[lang], "logoImgUrl", URL.createObjectURL(file));
      this.bannerWrite[lang] = file;
    },
     bannerClearlogo(lang) {
      //Проверка на BLOB
      if (this.cinemasFull[lang].logoImgUrl[0] != "b") {
        this.bannerRemove[lang] = this.cinemasFull[lang].logoImgUrl;
      }
      this.$set(this.cinemasFull[lang], "logoImgUrl", ""); //Для реактивности (1: выбираем обьект 2: выбираем ключ 3: на что меняем)
    },
    galleryPreview(index, lang, event) {
      const file = event.target.files[0];
      if (
        this.cinemasFull[lang].gallery[index] != "" &&
        this.cinemasFull[lang].gallery[index][0] != "b"
      ) {
        this.galleryRemove[lang][index] = this.cinemasFull[lang].gallery[index];
      }
      this.$set(
        this.cinemasFull[lang].gallery,
        index,
        URL.createObjectURL(file)
      );
      this.galleryWrite[lang][index] = file;
    },
    galleryClear(index, lang) {
      if (this.cinemasFull[lang].gallery[index][0] != "b") {
        this.galleryRemove[lang][index] = this.cinemasFull[lang].gallery[index];
      }
      this.$set(this.cinemasFull[lang].gallery, index, "");
    },
    async save() {
      this.uploading = true;
      this.loadingState = "Удаление изображений...";
      this.removingAll = this.removingCounter;
      await this.removeGalleryFromStorage();
      await this.removeBannerFromStorage();
      this.removingAll = 0;
      this.removingLeft = 0;
      this.loadingState = "Загрузка изображений...";
      this.loadingAll = this.uploadingCounter;
      await this.writeGalleryToStorage();
      await this.writeBannerToStorage();
      this.loadingAll = 0;
      this.loadingLeft = 0;
      await saveDb(`/cinemas/${this.$route.params.id}`, this.cinemasFull);
      this.saved = true;
      this.loadingState = "";
      this.uploading = false;
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 2000);
      setTimeout(() => {
        this.$router.push({ name: "AllCinemas" });
      }, 2000);
    },
     async writeGalleryToStorage() {
      for (const language in this.galleryWrite) {
        for (let i = this.galleryWrite[language].length - 1; i >= 0; i--) {
          let el = this.galleryWrite[language][i];
          if (el != "") {
            try {
              this.cinemasFull[language].gallery[i] = await saveStorage(
                el,
                "cinemas",
                this.$route.params.id
              );
              this.loadingLeft += 1;
              console.log("[SUCCESS]\n", el, "writen to storage");
            } catch (e) {
              console.log(
                "Error while writing picture",
                el,
                "into storage.",
                e
              );
            }
          }
        }
      }
      this.galleryWrite = { ru: ["", "", "", ""], ua: ["", "", "", ""] };
    },
     async writeBannerToStorage() {
      for (const lang in this.bannerWrite) {
        let el = this.bannerWrite[lang];
        if (el != "") {
          try {
            this.cinemasFull[lang].headImgUrl = await saveStorage(
              el,
              "cinemas",
              this.$route.params.id
            );
            this.loadingLeft += 1;
            console.log("[SUCCESS]\n", el, "writen to storage");
          } catch (e) {
            console.log("Error while writing picture", el, "into storage.", e);
          }
        }
      }
      this.bannerWrite = { ru: "", ua: "" };
    },
        async removeGalleryFromStorage() {
      for (const lang in this.galleryRemove) {
        for (
          let index = this.galleryRemove[lang].length - 1;
          index >= 0;
          index--
        ) {
          let el = this.galleryRemove[lang][index];
          if (el != "") {
            try {
              await deleteStorage(el);
              this.removingLeft += 1;
              console.log("[SUCCESS]\n", el, "removed from storage");
            } catch (e) {
              console.log(
                "Error while removing picture",
                el,
                "from storage.",
                e
              );
            }
          }
        }
      }
      this.galleryRemove = { ru: ["", "", "", ""], ua: ["", "", "", ""] };
    },
     async removeBannerFromStorage() {
      for (const lang in this.bannerRemove) {
        let el = this.bannerRemove[lang];
        if (el != "") {
          try {
            await deleteStorage(el);
            this.removingLeft += 1;
            console.log("[SUCCESS]\n", el, "removed from storage");
          } catch (e) {
            console.log("Error while removing picture", el, "from storage.", e);
          }
        }
      }
      this.bannerRemove = { ru: "", ua: "" };
    },
}
}
</script>

<style>

</style>