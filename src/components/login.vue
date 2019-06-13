<template>
<div class="form-wrapper">
    <el-form ref="form" :model="form" label-width="80px" :rules='rules' class="form">
  <el-form-item label="账号" prop='username'>
    <el-input v-model="form.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop='password'>
    <el-input v-model="form.password"></el-input>
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="onSubmit">登录</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          username:'',
          password:''
        },
        rules:{
          username:[
            // required 必须要输入, message提示的信息，trigger blur失去焦点时候触发
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
      onSubmit() {
        //发送给后台的数据
        const data = {
          uname:this.form.username,
          upwd:this.form.password
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$axios({
              url:'http://localhost:8899/admin/account/login',
              method:'POST',
              data,
              // 处理session跨域
        withCredentials: true
            }).then(res=>{
              console.log(res);
              const {message,status} = res.data;

              if(status===0){
                this.$store.commit('setUser',res.data.message)
                this.$router.push('/')
              }

              if(status===1){
                this.$message.error(message)
              }
            })
          }
        });
      }
    }
  }
</script>

<style>
    .form-wrapper{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        /* background-color: darkmagenta; */
    }
    .form{
        width: 400px;
        position: absolute;
        left: 50%;
        margin-left: -200px;
        top:50%;
        margin-top: -95px;
    }
</style>
