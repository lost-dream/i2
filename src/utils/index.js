import Vue from 'vue'

/**
 * 清楚登录信息
 */
export function clearLoginInfo() {
  Vue.cookie.delete('token')
}

// 删除数组中的值 removeArrValue(['a', 'b', 'c'], 'b') => ['a', 'c']
export function removeArrValue(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == val) {
      arr.splice(i, 1)
      break
    }
  }
}

// 多维数组降成一维数组 flatten([1,[2,3,[4,5]]]) => [1,2,3,4,5]
export function flatten(arr) {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(flatten(arr[i]))
    } else {
      res.push(arr[i])
    }
  }
  return res
}
