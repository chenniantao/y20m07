import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
//1.安装Vuex
Vue.use(Vuex)

//2.生成一个store的实例,注意,整个应用只能有一个store的实例
const store = new Vuex.Store({
    state,
    //store的计算属性
    getters,
    actions,
    mutations
})

//3.导出store的实例
export default store
