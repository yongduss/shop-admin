import Vue from 'vue';
import App from './App.vue';
//导入element组件
import ElementUI from 'element-ui'
//element样式
import 'element-ui/lib/theme-chalk/index.css';
//将axios绑定到原型上
import axios from 'axios'

import VueRouter from 'vue-router'

import Login from './components/login.vue'

import Admin from './components/admin.vue'

import Category from './components/category.vue'

import Goodlist from './components/good-list.vue'

import Goodadd from './components/good-add.vue'

import Goodedit from './components/good-edit.vue'

Vue.prototype.$axios = axios
    //注册路由
Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/admin/good-list',
    meta: '首页'
}, {
    path: '/login',
    component: Login,
    meta: '登录页'
}, {
    path: '/admin',
    component: Admin,
    meta: '后台页',
    children: [{
        path: 'good-list',
        component: Goodlist,
        meta: '商品管理'
    },
    {
        path:'good-add',
        component:Goodadd,
        meta:'商品添加'
    },
    {
        path:'good-edit/:id',
        component:Goodedit,
        meta:'编辑商品'
    } ,
    {
        path: 'category',
        component: Category,
        meta: '栏目列表'
    }]
}];

const router = new VueRouter({
    routes
})



Vue.config.productionTip = false



//注册element插件
Vue.use(ElementUI)
new Vue({
    render: h => h(App),
    router
}).$mount('#app')