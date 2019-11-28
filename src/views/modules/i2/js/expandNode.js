import { Node } from './entity/Node'
let _vm = null
export function expandNode(_vm, curNode) {
  if (curNode.childs && curNode.childs.length > 0) {
    // 前台聚合的数据直接展开
    // for (let i in curNode.childs) {
    // }
    expandChilds(curNode.childs, 2)
  } else {
    // 后台聚合的需要先查询再展开
    // 从服务器端获取数据，并添加到画布
    _vm.$api
      .queryDataByCluster({
        nodesType: curNode.nodeType,
        param: curNode.keyword,
      })
      .then(({ data }) => {
        let results = data.result.nodes
        let nodes = []
        for (let value of results) {
          nodes.push(new Node(value, _vm.global.network, _vm.global.nodes))
        }
        let nodesList = nodes

        let edges = data.result.edges
        edges.map(value => {
          value.step = Number(value.from.toString() + value.to.toString())
          value.str = value.label
          value.label = ''
        })

        let edgeList = []

        for (let item1 of edges) {
          let flag = true
          for (let item2 of edgeList) {
            if (item1.step === item2.step) {
              flag = false
              item2.str = item2.str + '/' + item1.str
            }
          }
          if (flag) {
            edgeList.push(item1)
          }
        }

        const getCount = (arr, value) =>
          arr.reduce((a, v) => (v === value ? a + 1 : a + 0), 0)

        for (let item of edgeList) {
          const arr = item.str && item.str.split('/')
          const arr2 = [...new Set(arr)]
          const resArr = []

          arr2.forEach(value => {
            resArr.push({
              value: value,
              count: getCount(arr, value),
            })
          })
          resArr.forEach(value => {
            item.label += `${value.value}${
              value.count > 1 ? `(${value.count})/` : '/'
            }`
          })
          item.label = item.label.slice(0, -1)
        }

        for (let i = 0; i < nodesList.length; i++) {
          if (_vm.global.nodes.getIds().indexOf(nodesList[i].id) < 0) {
            _vm.global.nodes.add(nodesList[i])
          }
        }

        for (let i = 0; i < edgeList.length; i++) {
          if (_vm.global.edges.getIds().indexOf(edgeList[i].id) < 0) {
            _vm.global.edges.add(edgeList[i])
          }
        }
      })
    // queryDataByCluster(curNode, function(res) {
    //   var results = res.result.nodes
    //   var nods = []
    //   for (var i in results) {
    //     nods.push(new Node(results[i], _vm.global.network, _vm.global.nodes))
    //   }
    //   var nodesList = nods
    //   var edgesList = res.result.edges
    //   for (let i = 0; i < nodesList.length; i++) {
    //     if (_vm.global.nodes.getIds().indexOf(nodesList[i].id) < 0) {
    //       _vm.global.nodes.add(nodesList[i])
    //     }
    //   }
    //   for (var j = 0; j < edgesList.length; j++) {
    //     if (_vm.global.edges.getIds().indexOf(edgesList[j].id) < 0) {
    //       _vm.global.edges.add(edgesList[j])
    //     }
    //   }
    // })
  }
}
// function queryDataByCluster(curNode, callback) {
//   var data = {
//     nodesType: curNode.nodeType,
//     param: curNode.keyword,
//   }
//   $.ajax({
//     type: 'GET',
//     url: window.SITE_CONFIG.baseUrl + 'i2/nodeAndRelationCtlr/spreadRelation',
//     contentType: 'application/json;charset=utf-8',
//     dataType: 'json',
//     data: data,
//     success: callback,
//   })
// }
/**
 * 是否展开子节点
 * @param {*} childs
 * @param {*} mode 0: 不自动展开 1：自动展开 2：强制展开
 */
function expandChilds(childs, mode) {
  addNodeToCanvas(childs, childs.length)
}
/**
 * 添加数据到画布
 * @param {*} childs
 * @param {number|string} count 只显示多少条数据
 */
function addNodeToCanvas(childs, count) {
  let subnodes = []
  // let newedges = []
  let updateNodes = []
  // let autoExpandNodes = []
  let ids = _vm.global.nodes.getIds()
  for (let idx in childs) {
    if (count && idx >= count) {
      break
    }
    let node = childs[idx]
    if (ids.indexOf(node.id) === -1) {
      // var obj = new Node(node);
      subnodes.push(node)
    } else {
      var un = _vm.global.nodes.get(node.id)
      if (un) {
        // un.multiRels |= node.rels.length > 1;// 多关系标识
        updateNodes.push(un)
      }
    }
  }
  addOrUpdateNode(subnodes, true)
  _vm.global.nodes.update(updateNodes)
}
/**
 * 添加或者更新节点
 * @param {*} node
 * @param {boolean} merge true: 如果画布上已经存在此id的节点，则合并现有数据
 * @param {boolean} physics true: 更新时是否保持现有位置不变
 */
function addOrUpdateNode(node, merge, physics) {
  let data = {
    add: [],
    update: [],
  }
  if (!(node instanceof Array)) {
    node = [node]
  }
  for (let i in node) {
    data.add.push(node[i])
  }
  if (data.add.length > 0) {
    _vm.global.nodes.add(data.add)
  }
}
