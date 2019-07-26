import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/index.styl'
import VueCookie from 'vue-cookie'
import httpRequest from './utils/httpRequest'
import api from './api/api'
import Validate from './utils/filter_rules';
import InputTag from 'vue-input-tag'

Vue.use(Validate)
Vue.use(ElementUI)
Vue.use(VueCookie)
Vue.component('input-tag', InputTag)
Vue.config.productionTip = false

// 全局挂载
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.$api = api // api 接口

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
