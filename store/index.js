import Vue from 'vue'
import Vuex from 'vuex'
// 注册插件
Vue.use(Vuex);

// 调用vuex创建一个仓库
const store = new Vuex.Store({
    state:{
        user:JSON.parse(localStorage.getItem('user')) || {}
    },
    // 设置仓库数据的方法
    mutations:{
        // 设置用户数据
        // state是默认的参数，所有mutations下的方法第一个参数都是state
        // state指向上面的仓库数据
        setUser(state,data) {
            state.user = data
            //将数据保存在本地
            localStorage.setItem('user',JSON.stringify(data) )
        }
    }
});

    

export default store;