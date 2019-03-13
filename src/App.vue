<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view v-wechat-title='$route.meta.title'/>
  </div>
</template>

<script>
  import  Index from "./components/index.vue"
export default {
  name: 'App',
  components:{
    Index
  }
}
</script>

<style>
@import "assets/css/index.css";
#app {
  /* font-family:Arial; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
  height: 100%
}
</style>
 