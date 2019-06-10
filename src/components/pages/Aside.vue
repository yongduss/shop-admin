<template>
    <!-- 菜单栏组件 -->
    <!-- default-active: 默认选中选项 -->
    <!-- active-text-color：高亮时候的颜色 -->
    <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    background-color="#001529"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isShow">
    <!-- //:collapse="isShow" 显示收缩和展开 -->

        <!-- 子菜单 -->
        <el-submenu index="1">
            <!-- slot指定模板中数据，这里暂时不使用 -->
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>购物商城</span>
            </template>

            <el-menu-item index="1-1">
                <template slot="title">
                    <router-link to="/admin/good-list" class="router">商品管理</router-link>
                </template>
            </el-menu-item>

            <el-menu-item index="1-2">
                <template slot="title">
                    <router-link to="/admin/category" class="router">栏目列表</router-link>
                </template>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    props:['isShow']
}
</script>

<style scope>
    .router{
        text-decoration: none;
        color: inherit;
    }
</style>
