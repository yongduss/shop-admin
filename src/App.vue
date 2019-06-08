<template>
  <div id="app">
    
    
      <router-view></router-view>
    
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
//请求
import axios from 'axios'
export default {
  name: 'app',
  components: {
    // HelloWorld
  },
  mounted() {
    //请求测试接口
    
  },
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
