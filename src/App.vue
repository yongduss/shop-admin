<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
      <el-button type="primary" plain>主要按钮</el-button>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <p>
      <router-view></router-view>
    </p>
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
    this.$axios({
      url:"https://api.github.com/users",
      method:'GET',

    }).then(res=>{
      console.log(res);
    })
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
