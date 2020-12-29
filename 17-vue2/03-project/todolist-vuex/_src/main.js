//整个项目的入口
import Vue from 'vue'
import App from './App.vue'

//引入router实例
import router from './router'
//引入store实例
import store from './store'

//关闭生产环境模式更改提示
Vue.config.productionTip = false

new Vue({
  router,//配置router
  store,//配置store
  render: h => h(App)
}).$mount('#app')
