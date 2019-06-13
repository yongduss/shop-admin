<template>
    <el-row type="flex" justify="space-between">
         <!-- 箭头 -->
            <div class="arrow" @click="handleClick">
                <i class="el-icon-back"></i>
            </div>
            <div>
                {{user.uname}} {{user.realname}}
                <span @click='handleQuit'>退出</span>
            </div>
</el-row>
</template>

<script>
export default {
    data() {
        return {
            user:{}
        }
    },
    mounted() {
        this.user = this.$store.state.user
        // console.log(this.user);

       

    },
    methods: {
        handleClick:function(){
            this.$emit('click')
        },
        handleQuit(){
            this.$axios({
                url:'http://localhost:8899/admin/account/logout',
                method:'GET',
                withCredentials: true
            }).then(res=>{
                if(res.data.status==0){
                    this.$message.success(res.data.message);
                    this.$router.push('/login');
                    //清除本地用户数据
                    localStorage.removeItem('user');
                }
            })
        }
    },
}
</script>

<style>
    .arrow{
        cursor: pointer;
    }
    span{
        cursor: pointer;
    }
</style>
