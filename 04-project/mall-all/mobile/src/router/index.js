import Vue from 'vue'
import VueRouter from 'vue-router'

//1. 安装VueRouter
Vue.use(VueRouter)

//2.引入组件
import Home from 'pages/home'
import Category from 'pages/category'
import Cart from 'pages/cart'
import User from 'pages/user'
import Search from 'pages/search'
//3.定义路由
const routes = [
  { path: '/home', component: Home },
  { path: '/category', component: Category },
  { path: '/cart', component: Cart },
  { path: '/user', component: User },      
  { path: '/search', component: Search },      
  { path: '/', redirect: '/home' },
]
//4.根据路由创建 router 实例
const router = new VueRouter({
  mode: 'history',//h5路由
  routes
})
//5.导出router 实例
export default router