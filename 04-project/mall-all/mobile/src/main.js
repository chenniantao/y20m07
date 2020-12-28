import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//全局加载vant组件
import './plugins/vant'

//引入过滤器
import filters from './filters/'

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
