import Vue from 'vue';
import App from './App.vue';
//导入element组件
import ElementUI from 'element-ui'
//element样式
import 'element-ui/lib/theme-chalk/index.css';
//将axios绑定到原型上
import axios from 'axios';

import VueRouter from 'vue-router';

import store from '../store/index'

import Login from './components/login.vue';

import Admin from './components/admin.vue';

import Category from './components/category.vue';

import Goodlist from './components/good-list.vue';

import Goodadd from './components/good-add.vue';

import Goodedit from './components/good-edit.vue';

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

// 路由守卫是路由对象下的方法`beforeEach`，会监听每次页面的请求，并且可以通过3个参数获取不同的信息
// to: 去哪个页面
// from:页面的来源
// next：是函数可以接受参数，接收参数是`url`，并且可以跳转到该`url`，如果不传参数会跳转`to`的页面
// next()方法是必须要调用的
router.beforeEach((to,from,next)=>{
    axios({
        url:"http://localhost:8899/admin/account/islogin",
        method:'GET',
        withCredentials: true,
    }).then(res=>{
        const code = res.data.code;
        // console.log(code);
        if(to.path=='/login'){
            if(code=='logined'){
                next('/admin/goods-list')
            }else{
                next();
            }
        }else{
            if(code=='logined'){
                next();
            }else{
                next('/login')
            }
        }
    })
    
})

Vue.config.productionTip = false



//注册element插件
Vue.use(ElementUI)
new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')