import global from '@/utils/global'
import { addOrUpdateNode } from './common'
/**
 * 矩形布局
 * @param _nodes
 */
export function rectangle(_nodes, left) {
  var step = global.LAYOUT_SPACE
  var size = Math.ceil(Math.sqrt(_nodes.length)) // 计算矩阵中每行的节点数

  if (!left) {
    left = calculateLeft(_nodes, size, step)
  }

  var x = left.x
  var y = left.y
  var x1 = x

  // 计算矩阵节点坐标
  var poss = []
  for (var i = 0; i < _nodes.length; i++) {
    if (i > 0 && i % size === 0) {
      y += step
      x = x1
    }
    poss.push({ x: x, y: y })

    x += step
  }

  // 节点在矩阵中显示
  var ns = []
  for (let i = 0; i < _nodes.length; i++) {
    var node = global.nodes.get(_nodes[i])

    node.x = poss[i].x
    node.y = poss[i].y
    node.physics = false
    ns.push(node)
  }

  addOrUpdateNode(ns, false, true)
}
/**
 * 环形布局
 * @param _nodes
 * @param center{x:, Y:}
 * @param closed 是否闭合(首尾相连)
 */
export function circle(_nodes, center, closed) {
  var radian = 360 / _nodes.length
  var radius = (global.LAYOUT_SPACE * _nodes.length) / (2 * Math.PI) // 计算半径 半径等于周长除以2派
  if (radius < 130) {
    radius = 130
  }

  if (!center) {
    center = calculateCenter(_nodes)
  }
  var x = center.x
  var y = center.y

  // 180时首尾闭合，190时首尾留有间隙
  var d = 180
  if (closed === false) {
    d = 190
  }

  // 计算环形坐标
  var poss = []
  for (var i = 0; i < _nodes.length; i++) {
    var x1 = x + radius * Math.sin((radian * i * Math.PI) / d)
    var y1 = y + radius * Math.cos((radian * i * Math.PI) / d)

    poss.push({ x: x1, y: y1 })
  }

  // 将节点在环形坐标中显示
  var ns = []
  for (var i = 0; i < _nodes.length; i++) {
    var node
    if (_nodes[i] instanceof Object) {
      node = _nodes[i]
    } else {
      node = global.nodes.get(_nodes[i])
    }

    node.x = poss[i].x
    node.y = poss[i].y
    node.physics = false

    ns.push(node)
  }

  addOrUpdateNode(ns, false, false)
}
/**
 * 计算节点的左上角
 */
function calculateLeft(arr, size, step) {
  var center = calculateCenter(arr)
  var s = (size / 2 - 0.5) * step

  center.x = center.x - s
  center.y = center.y - s

  return center
}
/**
 * 计算节点的中心点
 * @param arr
 * @returns {___anonymous9548_9591}
 */
function calculateCenter(arr) {
  var poss = global.network.getPositions(arr)
  var xsum = 0
  var ysum = 0

  for (var key in poss) {
    var x1 = poss[key].x
    var y1 = poss[key].y

    xsum += x1
    ysum += y1
  }

  var center = {
    x: xsum / arr.length,
    y: ysum / arr.length,
  }
  return center
}
