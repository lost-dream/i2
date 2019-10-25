/**
 * 首字母大写
 * @param {*} value
 */
export function capitalize(value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}
/**
 * 0 女 or 1 男 转换为男女
 * @param {*} num
 */
export function num2age(num) {
  if (!num) return ''
  return (num = parseInt(num) === 0 ? '女' : '男')
}
