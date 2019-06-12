<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属类型">
            <el-select v-model="form.category_id" placeholder="请选择活动区域">
                <el-option v-for='(item,index) in categorys'
                 :key='index'
                 :label="item.title"
                 :value="item.category_id"></el-option>

            </el-select>
        </el-form-item>

        <el-form-item label="是否发布">
            <el-switch v-model="form.status"></el-switch>
        </el-form-item>

        <el-form-item label="推荐类型">
            
                <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
                <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>

            
        </el-form-item>

        <el-form-item label="内容标题">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
  
        <el-form-item label="副标题">
            <el-input v-model="form.sub_title"></el-input>
        </el-form-item>
        <el-form-item label="封面图片">
            <!-- 上传组件 -->
        <!-- action：上传地址 -->
        <!-- show-file-list：是否支持多选 -->
        <!-- on-success: 上传成功之后的回调函数 -->
        <!-- before-upload：上传之前执行的函数 -->
        <el-upload
        class="avatar-uploader"
        action="http://localhost:8899/admin/article/uploadimg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>

        <el-form-item label="商品货号">
            <el-input v-model="form.goods_no"></el-input>
        </el-form-item>

        <el-form-item label="库存数量">
            <el-input v-model="form.stock_quantity"></el-input>
        </el-form-item>
  
        <el-form-item label="市场价格">
            <el-input v-model="form.market_price"></el-input>
        </el-form-item>

        <el-form-item label="销售价格">
            <el-input v-model="form.sell_price"></el-input>
        </el-form-item>

        <el-form-item label="图片相册">
            <!-- list-type: 声明当前图片相册的方式显示 -->
        <!-- on-preview：预览的事件处理函数 -->
        <!-- on-remove：删除图片时候触发的事件 -->
            <el-upload
            action="http://localhost:8899/admin/article/uploadimg"
            list-type="picture-card"
            :on-success="handleImgSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="form.fileList">
            <i class="el-icon-plus"></i>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            </el-upload>

        </el-form-item>

  <el-form-item label="内容摘要">
    <el-input type="textarea" v-model="form.zhaiyao"></el-input>
  </el-form-item>

    <el-form-item label="内容描述">
        <quillEditor v-model="form.content"></quillEditor>

    </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</template>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    import { quillEditor } from 'vue-quill-editor'

  export default {
    data() {
      return {
        categorys:[],//所属类型的数据

        form: {
          
          category_id: '',
          title:'',
          
          sub_title:'',//副标题
          goods_no:'',//商品货号
          stock_quantity:'',//库存数量
          market_price:'',//市场价格
          sell_price:'',//销售价格
          zhaiyao:'',
          content:'',//内容描述
          imgList:[],//单张图片
          fileList:[],//多张图片
          status: false,
          is_top:false,
          is_hot:false,

          is_slide:false, //1(true):文章在轮播图显示 0(false):不在轮播图中显示
         
        },
        //图片
        imageUrl: '',
        dialogImageUrl: '',
        dialogVisible: false

      }
    },
    components: {
        quillEditor
  },
    mounted() {
      this.$axios({
          url:'http://localhost:8899/admin/category/getlist/goods',
          method:'GET',
      }).then(res=>{
        //   console.log(res.data);
          this.categorys = res.data.message;
        //   console.log(this.categorys);
      })


        // console.log(this.$route);
        const id = this.$route.params.id;
        this.$axios({
            url:'http://localhost:8899/admin/goods/getgoodsmodel/'+id,
            method:'GET',
        }).then(res=>{
            console.log(res.data);
            // this.form = res.data.message
            const {status, message} = res.data;
            this.form = {  //将数字祖字符串 转成数字
                ...message,
                category_id: +message.category_id,
                fileList: message.fileList.map(v=>{
                  return {
                    ...v,
                    url:`http://localhost:8899${v.shorturl}`
                  }
                })
            }
            this.imageUrl = message.imgList[0].url
            // console.log(this.imgList);
            console.log(this.form);
        })

     },
    methods: {
        handleRemove(file, fileList) { //图片删除
        // console.log(fileList);
        const files = fileList.map(v=>{
            return v.response
        })
        this.form.fileList = files;

      },
      handlePictureCardPreview(file) { //预览的事件处理函数
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
       handleAvatarSuccess(res, file) { //上传图片
           //http://localhost:8080/58553e9f-54f2-4492-b707-f965fbb
        //    console.log(URL.createObjectURL(file.raw));
        this.imageUrl = URL.createObjectURL(file.raw);
        res.shorturl = '/'+res.shorturl;
        this.form.imgList = [res];
        // console.log(this.imgList);
      },
      beforeAvatarUpload(file) {
        
        const isLt2M = file.size / 1024 / 1024 < 2;

        
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      handleImgSuccess(res, file, fileList){  //自定义的上传多张图片后的回调函数
        // console.log(file);
        // console.log(fileList);

        // const files = fileList.map(v=>{
        //     return v.response;
        // })
        // this.form.fileList.push(files.response)
        this.form.fileList.push(file.response)
      },

      onSubmit() {
        // console.log('submit!');
        this.$axios({
            url:'http://localhost:8899/admin/goods/edit/' + this.$route.params.id,
            method:'POST',
            data: this.form,
                 // 处理session跨域
            withCredentials: true
        }).then(res=>{
            // console.log(this.form);
            // console.log(res);
            if(res.data.status===0){
                this.$message.success(res.data.message);

                this.$router.back()
            }else{
                this.$router.push('/login')
            }
        })
      }
    }
  }
</script>

<style>
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
