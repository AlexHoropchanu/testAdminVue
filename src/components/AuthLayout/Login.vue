<template>
<form class="form-horizontal" @submit.prevent="submitHandler">
                <div class="card-body">
                  <div class="form-group column">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10 center">
                      <input v-model="email" type="email" class="form-control" id="inputEmail3" placeholder="Email">
                    </div>
                  </div>
                  <div class="form-group column">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10 center">
                      <input v-model="password" type="password" class="form-control" id="inputPassword3" placeholder="Password">
                    </div>
                  </div>
                  <div class="form-group column">
                    <div class="offset-sm-2 col-sm-10">
                    </div>
                  </div>
                </div>
                <!-- /.card-body -->
                <div class="card-footer">
                  <button type="submit" class="btn btn-info">Sign in</button>
                </div>
                <!-- /.card-footer -->
              </form>
  <!-- <div class="wrapper"> 
    <h1>Login</h1>
        <form @submit.prevent="submitHandler">
          <input type="email" v-model="email" />
          <input type="password" v-model="password" />
    <button type="submit">submit</button></form>
    <div v-if="error" class="error" >{{getEmail}}</div>
  </div> -->
</template>

<script>


export default {

  name: "Login",
  props: {},
  data(){
    return{
    email: 'd@gmail.com',
    password:'111111'
    }
  },
  methods:{
    async submitHandler(){
      try {
        await this.$store.dispatch('login', {email:this.email, password:this.password})
      } catch (error) {
        console.log('ola')
      }
      
    }
  }

}
</script>

<style lang ="scss" scoped>
.form-horizontal{
  margin: 0 auto;
  text-align: center;
  max-width: 40vw;
}
.center{
  margin: 0 auto;
}
</style>
