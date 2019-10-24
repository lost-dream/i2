import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import ElementUI, { Message } from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/index.styl'
import 'vis/dist/vis.css'
import VueCookie from 'vue-cookie'
import Cookies from 'js-cookie'
import httpRequest from './utils/httpRequest'
import api from './api/api'
import Validate from './utils/filter_rules'
import * as filters from './filters'
import './assets/icon/iconfont.css'
import 'jquery'
import global from './utils/global'
import 'default-passive-events'

Vue.use(Validate)
Vue.use(ElementUI)
Vue.use(VueCookie)
Vue.config.productionTip = false

// 全局挂载
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.$api = api // api 接口
Vue.prototype.$Cookies = Cookies // Cookies
Vue.prototype.global = global
// 全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 未登录情况下，所有路由都跳转到登录页（除登录页）
router.afterEach(to => {
  const duration = 1500
  if (!Cookies.get('ac_token') && to.name !== 'login') {
    Message({ message: '你还没有登录', type: 'error', duration: duration })
    setTimeout(() => {
      router.push({ name: 'login' })
    }, duration)
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
