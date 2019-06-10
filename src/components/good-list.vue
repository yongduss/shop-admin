<template>
<div>
     <el-row type='flex' justify='space-between'>
        <div class="btn">
            <!-- 按钮 -->
            <el-button type="primary" round>新增</el-button>
            <el-button type="danger" round @click='handleDelmore'>删除</el-button>
        </div>
        <div>
            <el-input placeholder="请输入内容" class="input-with-select" v-model="serchValue">
                
                <el-button slot="append" icon="el-icon-search" @click='handleSerch'></el-button>
            </el-input>
        </div>
        
    </el-row>

    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="标题"
      width="300">
      <template slot-scope="scope">
          <el-row type='flex' align='middle'>
              <img :src="scope.row.imgurl" class="goods-img">
              <div>
                  {{scope.row.title}}
              </div>
          </el-row>
      </template>
    </el-table-column>
    <el-table-column
      prop="categoryname"
      label="类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="sell_price"
      label="价格"
      show-overflow-tooltip>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
     <!-- 分页 -->
        <!-- size-change: 显示条数切换 -->
        <!-- current-change：页数切换 -->
        <!-- current-page: 当前的页面 -->
        <!-- page-sizes：条数的选项 -->
        <!-- page-size:当前的条数 -->
        <!-- layout:默认布局 -->
        <!-- total: 数据全部条数 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
   
</div>
   

        
</template>

<script>
export default {
      data() {
      return {
         tableData: [
        //      {
        //     id: 103,        
        //     title: "骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫",
        //     is_top: 1,
        //     is_hot: 1,
        //     is_slide: 1,      
        //     categoryname: "男装",
        //     img_url: "/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
        //     imgurl:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1969255128,1774348070&fm=27&gp=0.jpg",
        //     goods_no: "NZ0000000002",
        //     stock_quantity: 200,
        //     market_price: 1000,
        //     sell_price: 800 
        // }
        ],
        selectGoods: [], // 选中的商品
        serchValue:'',//搜索框的内容

        pageIndex:1,//页数
        pageSize:5,//每页显示的条数  
        total:0//总条数 
      }
    },
    mounted() {
        this.getList()
    },
    methods: {
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.getList()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.pageIndex=val

      },
      // 条数的切换
    handleSelectionChange(val){
        // console.log(val);
        this.selectGoods=val
    },
    // 编辑
    handleEdit(val){
        console.log(val);
    },
    // 删除
    handleDelete(val){
        // console.log(val);
        const id = val.id;

        this.$axios({
            url:`http://localhost:8899/admin/goods/del/${id}`,
            method:'GET',
        }).then(res=>{
            if(res.data.status===0){
                this.$message.success(res.data.message);
                this.getList()
            }else{
                this.$message.error(message);
            }
        })
    },
    // 删除多项
    handleDelmore(){
        console.log(this.selectGoods);
        const arr = this.selectGoods.map(v=>{
            return v.id;
        })
        var ids = arr.join(',');

        this.$axios({
            url:`http://localhost:8899/admin/goods/del/${ids}`,
            method:'GET',
        }).then(res=>{
            if(res.data.status===0){
                this.$message.success(res.data.message);
                this.getList()
            }else{
                this.$message.error(message);
            }
        })
    },
    //搜索
    handleSerch(){
        this.getList()
    },
    //获取后台商品数据
    getList(){
        this.$axios({
            url:`http://127.0.0.1:8899/admin/goods/getlist?pageIndex=${this.pageIndex}
            &pageSize=${this.pageSize}&searchvalue=${this.serchValue}`,
            method:'GET',
        }).then(res=>{
            console.log(res.data);
            this.tableData = res.data.message;
            // 总条数
            this.total = res.data.totalcount
        })
    }
    },
    
}
</script>

<style>
    .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .btn{
      margin-bottom: 15px;
  }
  .goods-img{
      width: 60px;
      height: 60px;
       /*表示元素压缩的倍数，如果是0，表示不会被挤压*/
      flex-shrink: 0;
  }

  
</style>
