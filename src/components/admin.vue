<template>
    <el-container>
  <el-aside width="200px">Aside</el-aside>
  <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {

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
