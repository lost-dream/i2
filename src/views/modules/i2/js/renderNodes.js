import { addOrUpdateEdge, addOrUpdateNode } from './common'
import { rectangle } from './layout'
import { Edge } from './entity/Edge'
import { Node } from './entity/Node'
let nodes = null
let edges = null
let network = null
export function renderNodes(vm, ns) {
  nodes = vm.global.nodes
  edges = vm.global.edges
  network = vm.global.network
  expandChilds(ns)
  var arr = []
  for (var i in ns) {
    arr.push(ns[i].id)
  }
  rectangle(arr)
}
/**
 *
 * @param {*} childs
 * @param {*} mode 0： 不自动展开，1：自动展开 2：强制展开
 * @param {*} callback
 */
function expandChilds(childs, mode, callback) {
  if (childs && childs.length > 0) {
    var pnode = nodes.get(childs[0].pid)
    if (pnode) {
      var arr = []
      var newChilds = []
      for (var i in childs) {
        var edge = edges.get({
          filter: function(edge) {
            return edge.from === pnode.pid && edge.to === childs[i].id
          },
        })[0]
        if (edge) {
          // 只更新连线
          var edg = new Edge(childs[i])
          edg.from = pnode.pid
          arr.push(edg)
        } else {
          // 增加节点
          newChilds.push(childs[i])
        }
      }
      childs = newChilds
      addOrUpdateEdge(arr)
    }
  }
  // 添加节点到画布
  addNodeToCanvas(childs, childs.length)
  if (callback) {
    setTimeout(callback, 100)
  }
}
/**
 * 添加数据到画布
 * @param {*} childs
 * @param {*} count 只显示前多少条数据
 */
function addNodeToCanvas(childs, count) {
  var subnodes = []
  // var newedges = [];
  var updateNodes = []
  // var autoExpandNodes = [];

  var ids = nodes.getIds()
  for (var idx in childs) {
    if (count && idx >= count) {
      break
    }
    let node = childs[idx]
    if (ids.indexOf(node.id) === -1 && !arrayExistsNode(subnodes, node.id)) {
      // 判断在聚合节点中是否已经存在
      if (existsInCluster(node.pid, node.id)) continue
      var obj = new Node(node, network, nodes)
      subnodes.push(obj)
    } else {
      var un = nodes.get(node.id)
      if (un) {
        updateNodes.push(un)
      }
    }
  }
  addOrUpdateNode(subnodes, true)
  nodes.update(updateNodes)
  // 自动布局
  // if (AUTO_LAY === true) { expandLayout(subnodes); }
}
/**
 * 判断在聚合节点中是否已经存在
 * @param pid
 * @param id
 * @returns {Boolean}
 */
function existsInCluster(pid, id) {
  if (!pid) {
    return false
  }

  var pnode = nodes.get(pid)
  if (!pnode) {
    return false
  }

  var childs = pnode.getChilds()
  for (var i in childs) {
    var n = childs[i]
    if (arrayExistsNode(n.childs, id)) {
      return true
    }
  }
  return false
}
/**
 *
 * @param {*} subnodes
 * @param {*} id
 */
function arrayExistsNode(subnodes, id) {
  for (var i in subnodes) {
    if (subnodes[i].id === id) {
      return true
    }
  }
  return false
}
