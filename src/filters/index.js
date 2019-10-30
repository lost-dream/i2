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
/**
 * 节点类型转成中文
 * @param {*} type
 */
export function type2Chinese(type) {
  let label = ''
  switch (type) {
    case 'Person':
      label = '人'
      break
    case 'Car':
      label = '车'
      break
    case 'DrivingLicense':
      label = '驾照'
      break
    case 'Case':
      label = '案件'
      break
    case 'Household':
      label = '住址'
      break
    default:
      label = '其他'
  }
  return label
}
/**
 *
 * @param {*} type
 */
export function relation2Chinese(type) {
  let label = ''
  switch (type) {
    case '"SAME_PLANE"':
      label = '同飞机'
      break
    case 'HAVE_CAR':
      label = '拥有车'
      break
    case 'SAME_HOTEL':
      label = '同旅馆'
      break
    case 'HAVE_DRIVING_LICENSE':
      label = '驾照'
      break
    case 'SAME_HOUSEHOLD':
      label = '同户'
      break
    case 'SAME_TRAIN':
      label = '同火车'
      break
    case 'SAME_COACH':
      label = '同汽车'
      break
    case 'SAME_ROOM':
      label = '同房间'
      break
    case 'BELONG_TO':
      label = '户主'
      break
    case 'SAME_CASE':
      label = '从犯'
      break
    default:
      label = '其他'
  }
  return label
}
