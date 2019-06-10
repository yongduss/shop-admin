<template>
    <el-container>
  <el-aside width="auto">
      <Aside :isShow='isShow'/>
  </el-aside>
  <el-container>
    <el-header>
      <Header @click='handleChange'/>
        </el-header>
    <el-main>
      <!-- 面包 -->
        <Bread/>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
//头部
import Header from './pages/Header.vue'
//面包屑
import Bread from './pages/Bread.vue'
//导航栏
import Aside from './pages/Aside.vue'
export default {
    data(){
      return {
        isShow:false,
      }
    },
    methods: {
      handleChange:function(){
        this.isShow = !this.isShow
      }
    },
    components:{
        Header,
        Bread,
        Aside
    }
}

</script>

<style>
    .el-header, .el-footer {
    background-color: skyblue;
    
     line-height: 60px;
    
   
  }
  
  .el-aside {
    background-color: darkmagenta;
    color: #333;
    
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    
    
  }
  
  body > div > .el-container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
