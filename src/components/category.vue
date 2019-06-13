<template>
    <div>
        <!-- data: 组件接收的数据 -->
    <!-- show-checkbox: 是否显示选择框 -->
    <!-- node-key: 类似for循环的:key -->
    <!-- default-expand-all: 默认展开全部 -->
    <!-- expand-on-click-node：是否在点击节点的时候展开或者收缩节点 -->
    
    
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.title }}</span>
        <span>
          <input :value="data.sort_id"
          @blur="hadnleBlur($event,data)"/>
        </span>
        <span>
          <el-button
            type="text"
            size="mini"
            >
            编辑
          </el-button>
          
        </span>
      </span>
    </el-tree>

    
</div>
</template>

<script>
// let id = 1000;

  export default {
    data() {
      
      return {
        data: [],
        
      }
    },
    mounted() {
      this.getList()
    },

    methods: {
        hadnleBlur(event,data){
          // console.log(123);
          console.log(data.sort_id,event.target.value);
          if(data.sort_id == event.target.value){
            // console.log(data.cort_id);
            // console.log(event.target.value);
            return;
          }

          const res = window.confirm('是否确认修改?')  //会返回一个true 或 false
          if(res){
            this.$axios({
            url:'http://localhost:8899/admin/category/edit/'+data.category_id,
            method:'POST',
            data:{
              ...data,
              sort_id:event.target.value
            },
            withCredentials: true
          }).then(res=>{
            // console.log(res);
              this.getList();
              this.$message.success('修改成功')
          })
          }
          
        },
        getList(){
          this.$axios({
        url: "http://localhost:8899/admin/category/getlist/goods",
        method:'GET',
      }).then(res=>{
        if(res.data.status === 0 ){
          this.data = res.data.message;
          // console.log(this.data);
        }
      })
        }
    }
  };
</script>

<style>
    .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
