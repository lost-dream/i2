import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/store'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/index.styl'
import 'vis/dist/vis.css'
import VueCookie from 'vue-cookie'
import httpRequest from './utils/httpRequest'
import api from './api/api'
<<<<<<< HEAD
import Validate from './utils/filter_rules'
=======
import Validate from './utils/filter_rules';
import './assets/icon/iconfont.css';
>>>>>>> 6128a22e5f0b5e741050c3dd9e1e7102610adb9a
import 'jquery'

Vue.use(Validate)
Vue.use(ElementUI)
Vue.use(VueCookie)
Vue.config.productionTip = false

// 全局挂载
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.$api = api // api 接口

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
