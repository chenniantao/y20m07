import Vue from 'vue'
import Vuex from 'vuex'

//1.安装Vuex
Vue.use(Vuex)

//2.生成一个store的实例,注意,整个应用只能有一个store的实例
const store = new Vuex.Store({
    state:{
        list:[{id:1,task:'learn vuex'}]
    }
})

//3.导出store的实例
export default store
