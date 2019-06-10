<template>
    <div class="bread">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for='(item,index) in info' :key='index'>
                {{item}}
        </el-breadcrumb-item>
        
        
        
    </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data() {
        return {
            info:[]
        }
    },
    watch: {
        $route(){
            
        }
    },
    methods: {
        getInfo(){
            const arr = this.$route.matched;
            let info = [];
            arr.forEach(v=>{
                info.push(v.meta);
            })
            this.info = info;
            console.log(this.info);

        }
    },
    mounted() {
        // console.log(this.$route);
           this.getInfo()
         

    },
}
</script>

<style>
    .bread{
        padding-bottom: 10px;
        border-bottom: 1px solid steelblue;
        margin-bottom: 15px;
    }
</style>
