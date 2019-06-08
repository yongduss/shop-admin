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

Vue.prototype.$axios = axios
    //注册路由
Vue.use(VueRouter)

const routes = [{
    path: '/login',
    component: Login
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