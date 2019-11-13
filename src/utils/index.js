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

// 16进制颜色转rgb hex2RGB('#ace') => rgb(170,204,238)
export function hex2RGB(hex) {
  const rgb = []
  hex = hex.substr(1)

  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, '$1$1')
  }

  hex.replace(/../g, function(color) {
    rgb.push(parseInt(color, 0x10))
  })

  return `rgb(${rgb.join(',')})`
}

// 16进制颜色转rgb hex2RGB('rgb(170,204,238)') => '#aaccee'
export function RGB2Hex(rgb) {
  const color = rgb.toString().match(/\d+/g)
  let hex = '#'

  for (let i = 0; i < 3; i++) {
    // 'Number.toString(16)' 是JS默认能实现转换成16进制数的方法.
    // 'color[i]' 是数组，要转换成字符串.
    // 如果结果是一位数，就在前面补零。例如： A变成0A
    hex += ('0' + Number(color[i]).toString(16)).slice(-2)
  }

  return hex
}
