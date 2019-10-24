/**
 * 对象按照某个键值大小排序
 * @param {*} property 比对的参数
 * @param {number} mode 升序 1 or 降序 -1
 * @return {Function}
 * @example
 ** res = [{name: 'a', age: 20},{name: 'b', age: 10}]
 ** res.sort(compare('age')) => [{name: 'b', age: 10},{name: 'a', age: 20}]
 */
export default function compare(property, mode = -1) {
  return function(obj1, obj2) {
    let [value1, value2] = [obj1[property], obj2[property]]
    if (mode === 1) {
      return value1 - value2
    } else {
      return value2 - value1
    }
  }
}
