<template>
    <el-row type="flex" justify="space-between">
         <!-- 箭头 -->
            <div class="arrow" @click="handleClick">
                <i class="el-icon-back"></i>
            </div>
            <div>admin 超级管理员 退出</div>
</el-row>
</template>

<script>
export default {
    methods: {
        handleClick:function(){
            this.$emit('click')
        }
    },
}
</script>

<style>
    .arrow{
        cursor: pointer;
    }
</style>
