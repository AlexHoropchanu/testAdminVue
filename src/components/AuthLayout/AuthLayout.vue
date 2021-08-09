<template>
    <div>
        <div class="wrapper">
        <Login />
        <router-view />
        </div>
    </div>
</template>

<script>
import Login from './Login.vue'
export default {
    name:'AuthLayout',
    components:{
        Login
    }
}
</script>

<style>

</style>