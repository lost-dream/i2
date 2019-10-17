/**
 *
 * @param {*} property 比对的参数
 * @param {number} mode 升序 1 or 降序 -1
 */
export default function compare(property, mode = -1) {
  return function(obj1, obj2) {
    let [value1, value2] = [obj1[property], obj2[property]]
    if (mode === 1) {
      return value1 - value2 // 升序
    } else {
      return value2 - value1
    }
  }
}
