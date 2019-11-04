/* eslint-disable no-extend-native */
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
// Array扩展方法，删除数组中某个元素  ['banana', 'apple', 'orange'].remove('banana') => ['apple', 'orange']
Array.prototype.indexOf = function(value) {
  for (let index = 0; index < this.length; index++) {
    if (this[index] == value) return index
  }
  return -1
}

Array.prototype.remove = function(value) {
  const index = this.indexOf(value)
  if (index > -1) {
    this.splice(index, 1)
  }
}

let roleStrList = {}

Vue.prototype.$roleStrList = roleStrList

router.beforeEach((to, from, next) => {
  console.log('当前' + to.path + '页面前的操作1')
  console.log('即将进入' + from.path + '页面前的操作2')
  console.log(roleStrList)
  // Cookies.set('roleStr', roleStr)
  next()
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
  let roleStrLisr = JSON.parse(Cookies.get('roleStrLisr'))
  let roleStrObj = roleStrLisr.find(item => {
    return item.urlName === to.meta.rolePath
  })
  let roleStr = 'roleStr'
  if (roleStrObj !== undefined) {
    roleStr = roleStrObj.roleStr
  }
  Cookies.set('roleStr', roleStr)
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
