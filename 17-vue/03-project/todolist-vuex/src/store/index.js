import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//1.安装Vuex
Vue.use(Vuex)

//2.生成一个store的实例,注意,整个应用只能有一个store的实例
const store = new Vuex.Store({
    state:{
        list: []
    },
    //store的计算属性
    getters:{
        //state是当前模块的state
        total(state){
            return state.list.length
        }
    },
    actions:{
        async loadItem({ commit}){
            const result = await axios.get('http://127.0.0.1:3000')
            commit('loadItem', result.data)
        }
    },
    mutations:{
        loadItem(state,payload){
            state.list = payload
        },
        addItem(state,payload){
            state.list.push(payload)
        },
        delItem(state,payload){
            const list = state.list.filter(item=>item.id != payload)
            state.list = list
        }   
    }
})

//3.导出store的实例
export default store
