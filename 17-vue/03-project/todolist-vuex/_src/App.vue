<!--整个页面的根组件-->

<!--1.模版-->
<template>
  <div id="app">
    <!--
    <Home></Home>
    <div>app</div>
    -->
    <nav>
      <router-link to="/home">Home</router-link> |
      <router-link to="/todolist">TodoList</router-link>
    </nav>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<!--1.逻辑-->
<script>
//引入组件
import Home from './pages/home/index.vue'
//导出当前组件的配置
export default {
  //注册组件
  components:{
    Home
  }
}
</script>