<template>
  <div>
    <div>

  <b-card no-body>
    <b-tabs card>
      <b-tab
    v-for="(lenguage, index) in lenguages"
    :key="index"
    :title="index == 'ru' ? 'Русский' : 'Украинский'"
    >
    <b-card-text>
      <b-form-group
      label='Название фильма'
      :label-for="'title'+ index"
      >
      <b-form-input
      :id="'title'+ index"
      v-model="lenguage.nameFilm"
      ></b-form-input>
      </b-form-group>
      <b-form-group
      label="Описание"
      label-cols-lg="3"
      content-cols-lg="9"
      :label-for="'about' + index"
      >
        <b-form-textarea
        :id="'about' + index"
        v-model="lenguage.aboutFilm"
        ></b-form-textarea>
      </b-form-group>
<b-container>
        <b-img
      fluid
      :src="lenguage.imgUrl"
      >
      </b-img>
</b-container>
      <b-form-group
      label="Главная картинка"
      :label-for="'headPicture'+index"
      >
      <b-form-file
      :id="'headPicture'+index"
      browse-text="Загрузить"
      @change= onFilePicked(index,$event)
      accept="image/*"
      >
      </b-form-file>
            <b-button
      @click="del(index)"
      >Удалить</b-button>
      </b-form-group>
      <b-form-group
      label="Галерея картинок"
      :label-for="'gallery'+index"
      >
      <b-container>
        <b-col
        v-for="(card, id) in lenguage.gallery"
            :key="id">
            <b-form-file
            browse-text="Загрузить"
            @change="onFilePickedGallery(id, index, $event)"
            accept="image/*"
      >

      </b-form-file>
      <b-img
  :src="card.imageUrl"
  ></b-img>
            </b-col>        
      </b-container>
      </b-form-group>
              <b-form-group
              label="Ссылка на трейлер"
              :label-for='"urlTrailer"'
              >
              <b-form-input
              :id='"urlTrailer"'
              v-model="lenguage.trailerUrl"
              ></b-form-input>
              </b-form-group>
        <b-form-group
        label='Тип кино'>
        <b-form-checkbox v-model="lenguage.d2">2D</b-form-checkbox>
        <b-form-checkbox v-model="lenguage.d3">3D</b-form-checkbox>
        <b-form-checkbox v-model="lenguage.imax">IMAX</b-form-checkbox>
        </b-form-group>
        <b-form-group
        label="Seo Block">
        <b-form-group
        label="URL:">
          <b-form-input  v-model="lenguage.seoUrl"></b-form-input>
          </b-form-group>
        
        <b-form-group label="Title"><b-form-input v-model="lenguage.seoTitle"></b-form-input></b-form-group>
        
        <b-form-group label="Keywords"><b-form-input  v-model="lenguage.seoKeywords"></b-form-input></b-form-group>
        
        <b-form-group label="Descriptions"><b-form-input  v-model="lenguage.seoDescription"></b-form-input></b-form-group>

        </b-form-group>
        <b-button @click="save">Cохранить</b-button>
    </b-card-text>
    </b-tab>
    </b-tabs>
  </b-card>
</div>

  </div>  
</template>

<script>
import {saveStorage} from '../../modules/firebase'
export default {
  name: "EditFilm",
  computed:{
    lenguages(){
      return{
ru: this.curFilm.ru,
ua:this.curFilm.ua
      }
    }
       
  },
  data() {
    return {
              saveImages: {
          ru:'', 
          ua:''
          },
          saveImagesGallery: {
          ru:['','','','',''], 
          ua:['','','','','']
          },
      curFilm:{
        id: Date.now(),

        ru:{
          imgUrl:'https://via.placeholder.com/1600x900.png',
          nameFilm: "1",
          aboutFilm: "1",
          trailerUrl:"1",
          d2: [true],
          d3: [false],
          imax: [false] ,
          seoUrl:"1",
          seoTitle:"1",
          seoKeywords:"1",
          seoDescription:"1",
          gallery:[
            {
          imageUrl:
            "https://via.placeholder.com/1600x900.png",
          id: Date.now(),
        },
        {
          imageUrl:
            "https://via.placeholder.com/1600x900.png",
          id: Date.now(),
        },
        {
          imageUrl:
            "https://via.placeholder.com/1600x900.png",
          id: Date.now(),
        },
        {
          imageUrl:
            "https://via.placeholder.com/1600x900.png",
          id: Date.now(),
        },
        {
          imageUrl:
            "https://via.placeholder.com/1600x900.png",
          id: Date.now(),
        },
          ]
        },
        ua:{
          imgUrl:'https://via.placeholder.com/1600x900.png',
          nameFilm: "",
          aboutFilm: "",
          trailerUrl:"",
          seoUrl:"",
          seoTitle:"",
          seoKeywords:"",
          seoDescription:"",
                    gallery:[
            {
          imageUrl:
            "https://via.placeholder.com/1600x900.png",
          id: Date.now(),
        },
        {
          imageUrl:
            "https://via.placeholder.com/1600x900.png",
          id: Date.now(),
        },
        {
          imageUrl:
            "https://via.placeholder.com/1600x900.png",
          id: Date.now(),
        },
        {
          imageUrl:
            "https://via.placeholder.com/1600x900.png",
          id: Date.now(),
        },
        {
          imageUrl:
            "https://via.placeholder.com/1600x900.png",
          id: Date.now(),
        },
          ]
        },
        
      },
    };
  },
  methods: {
    del(index){
      console.log(index)
    },
    onFilePicked(index, event) {
      const file = event.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      this.curFilm[index].imgUrl = fileUrl;
      this.saveImages[index] = file;
    },
    onFilePickedGallery(id, index, event) {
      const file = event.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      this.curFilm[index].gallery[id].imageUrl = fileUrl;
      this.saveImagesGallery[index][id] = file
    },
    async writeImage(){
      for (const i in this.saveImagesGallery)
      if(this.saveImages[i] != ''){
        this.curFilm[i].imgUrl = await saveStorage(this.saveImages[i],'films',this.$route.params.id)
      }
    },
    //  async writeImagesGallery(){
    //   for (const i in this.saveImagesGallery)
    //   this.saveImagesGallery[i].forEach(element => {
    //     if(element != ''){
    //       this.curFilm.gallery[element].imageUrl = saveStorage(element,'films/gallery',this.$route.params.id)
    //     }
    //   })
    // },
  async save(){
    await this.writeImage()
    // await this.writeImagesGallery()
  }
  },

};
</script>

<style>

</style>
