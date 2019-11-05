import Vue from 'vue'

/**
 * 清楚登录信息
 */
export function clearLoginInfo() {
  Vue.cookie.delete('token')
}

export function removeArrValue(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == val) {
      arr.splice(i, 1)
      break
    }
  }
}
