let _vm = null;
export function expandNode (vm, curNode, auto) {
  _vm = vm;
  if (curNode.childs && curNode.childs.length > 0) { // 前台聚合的数据直接展开
    for (var i in curNode.childs) {
    }
    expandChilds(curNode.childs, 2);
  } else { // 后台聚合的需要先查询再展开
    // 从服务器端获取数据，并添加到画布
    queryDataByCluster(curNode, function (res) {
      var nodesList = res.result.nodes;
      var edgesList = res.result.edges;
      for (var i = 0; i < nodesList.length; i++) {
        if (_vm.global.nodes.getIds().indexOf(nodesList[i].id) < 0) {
          _vm.global.nodes.add(nodesList[i]);
        }
      }
      for (var j = 0; j < edgesList.length; j++) {
        if (_vm.global.edges.getIds().indexOf(edgesList[j].id) < 0) {
          _vm.global.edges.add(edgesList[j]);
        }
      }
    })
  }
}
function queryDataByCluster (curNode, callback) {
  var data = {
    nodesType: curNode.nodeType,
    param: curNode.keyword
  };
  $.ajax({
    type: 'GET',
    url: window.SITE_CONFIG.baseUrl + 'i2/nodeAndRelationCtlr/spreadRelation',
    contentType: 'application/json;charset=utf-8',
    dataType: 'json',
    data: data,
    success: callback
  })
}
/**
   * 是否展开子节点
   * @param {*} childs
   * @param {0: 不自动展开 1：自动展开 2：强制展开} mode
   */
function expandChilds (childs, mode) {
  addNodeToCanvas(childs, childs.length)
}
/**
 * 添加数据到画布
 * @param {*} childs
 * @param {只显示多少条数据} count
 */
function addNodeToCanvas (childs, count) {
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
      subnodes.push(node);
    } else {
      var un = _vm.global.nodes.get(node.id);
      if (un) {
        // un.multiRels |= node.rels.length > 1;// 多关系标识
        updateNodes.push(un);
      }
    }
  }
  addOrUpdateNode(subnodes, true);
  _vm.global.nodes.update(updateNodes);
}
/**
 * 添加或者更新节点
 * @param {*} node
 * @param {true 时，如果画布上已经存在此id的节点，则合并现有数据} merge
 * @param {true 更新时是否保持现有位置不变} physics
 */
function addOrUpdateNode (node, merge, physics) {
  let data = {
    add: [],
    update: []
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
