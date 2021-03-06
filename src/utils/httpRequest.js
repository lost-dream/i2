import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import merge from 'lodash/merge'
import Cookies from 'js-cookie'
import { Message } from 'element-ui'

const http = axios.create({
  timeout: 1000 * 30,
  // 是否携带cookie信息
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    // 'Content-Type': 'application/x-www-form-urlencoded', // 登录请求request header ？？？
  },
})

window.SITE_CONFIG = {
  baseUrl: 'http://192.168.1.127:8081/',
}

/**
 * 请求拦截
 */
http.interceptors.request.use(
  config => {
    if (Cookies.get('ac_token')) {
      config.headers['accessToken'] = Cookies.get('ac_token')
    }
    config.headers['roleStr'] = Cookies.get('roleStr')
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

/**
 * 响应拦截
 */
http.interceptors.response.use(
  response => {
    // if (!(response.data && response.data.code)) return

    // switch (response.data.code) {
    //   case 200:
    //     break
    //   case 401: // token失效
    //     Cookies.remove('ac_token')
    //     Cookies.remove('user_info')
    //     Cookies.remove('userId')
    //     router.push({ name: 'login' })
    //     break
    //   default:
    //     Message({
    //       message: response.data.message,
    //       type: 'error',
    //     })
    // }
    if (!(response.data && response.data.code)) return
    switch (response.data.code) {
      case 200:
        break
      case 401: // token失效
        Cookies.remove('ac_token')
        Cookies.remove('user_info')
        Cookies.remove('userId')
        router.push({ name: 'login' })
        break
      // TODO 这里的errCode是多少
      case 500:
        const duration = 1000
        Message({
          type: 'error',
          // err_msg 在接口的返回值有的是message有的是msg，淦
          message: response.data.message || response.data.msg,
          duration,
        })
        // setTimeout(() => {
        //   router.push({ name: 'login' })
        // }, duration)
        break
    }
    return response
  },
  error => {
    return Promise.reject(error)
  },
)
/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
// http.adornUrl = actionName => {
//   // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
//   // console.log(window.SITE_CONFIG.baseUrl)
//   return (
//     (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY
//       ? '/proxyApi/'
//       : window.SITE_CONFIG.baseUrl) + actionName
//   )
// }

http.adornUrl = actionName => {
  return process.env.VUE_APP_COMMON_REQUEST_URL + actionName
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
  var defaults = {
    t: new Date().getTime(),
  }
  return openDefultParams ? merge(defaults, params) : params
}
/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
  var defaults = {
    time: new Date().getTime(),
  }
  data = openDefultdata ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}
export default http
