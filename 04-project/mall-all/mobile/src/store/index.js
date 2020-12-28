import Vue from 'vue'
import Vuex from 'vuex'
import home from 'pages/home/store'
//1.安装Vuex
Vue.use(Vuex)

//2.生成一个store的实例,注意,整个应用只能有一个store的实例
const store = new Vuex.Store({
  modules: {
    home
  }
})

//3.导出store的实例
export default store
