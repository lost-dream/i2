import global from '@/utils/global'
import { Edge } from './entity/Edge'
import FileSaver from 'file-saver'
/**
 * 添加或者更新节点
 * @param {*} node
 * @param {*} merge: true 如果画布上已经存在此id的节点，则合并现有数据
 * @param {*} physics： true 更新时是否保持现有位置不变
 */
export function addOrUpdateNode(node, merge, physics) {
  let data = {
    add: [],
    update: [],
  }
  if (!(node instanceof Array)) {
    node = [node]
  }
  for (let i in node) {
    if (global.nodes.getIds().indexOf(node[i].id) === -1) {
      data.add.push(node[i])
    } else {
      if (merge === true) {
        var n = global.nodes.get(node[i].id)
        n.merge(node[i])
        data.update.push(node[n])
      } else {
        data.update.push(node[i])
      }
    }
  }
  if (data.add.length > 0) {
    global.nodes.add(data.add)
  }
  if (data.update.length > 0) {
    // 更新时是否保持现有位置不变，physics = true
    if (physics === true) {
      for (let i in data.update) {
        if (
          data.update[i].physics === undefined ||
          data.update[i].physics === true
        ) {
          data.update[i].x = undefined
          data.update[i].y = undefined
          data.update[i].physics = false
          data.update[i].hiddenPhysics = true
        }
      }
      global.nodes.update(data.update)
      for (let i in data.update) {
        if (data.update[i].hiddenPhysics === true) {
          data.update[i].physics = true
          data.update[i].hiddenPhysics = undefined
        }
      }
    }
    global.nodes.update(data.update)
  }
}
/**
 * 新增或者更新连线
 * @param {*} edge
 */
export function addOrUpdateEdge(edge) {}
/**
 * 是否禁用
 * @param obj
 * @returns
 */
export function isDisabled(obj) {
  return $(obj).hasClass('disabled')
}
// 获取连接两个节点a和b的边的id ---自建关系
export function getEdgesZjgxConnectings(a, b) {
  var edge = global.edges.get({
    filter: function(edge) {
      return edge.from === a && edge.to === b
    },
  })[0]

  if (edge instanceof Object) {
    return edge.id
  }
}
/**
 * 创建自建关系
 * @param from
 * @param to
 * @returns {Edge}
 */
export function createZjgxEdge(from, to) {
  var node = {
    id: to,
    pid: from,
  }
  var edge = new Edge(node)
  return edge
}
/**
 * 锁定---所点节点，不让其自动移动
 * @param node
 */
export function lockNode(node) {
  var _ns = []
  if (node instanceof Array) {
    _ns = node
  } else {
    _ns.push(node.id)
  }

  var arr = []
  for (var i in _ns) {
    node = global.nodes.get(_ns[i])
    if (!node) {
      continue
    }

    node.physics = false
    arr.push(node)
  }

  global.nodes.update(arr)
}
/**
 * 解锁
 * @param node
 */
export function unNockNode(node) {
  var _ns = []
  if (node instanceof Array) {
    _ns = node
  } else {
    _ns.push(node.id)
  }

  var arr = []
  for (var i in _ns) {
    node = global.nodes.get(_ns[i])
    if (!node) {
      continue
    }

    node.x = undefined
    node.y = undefined
    node.physics = true

    arr.push(node)
  }
  global.nodes.update(arr)
}
/**
 * 删除节点 或 边
 */
export function deleteOperation(nodeId) {
  var selNodes = global.network.getSelectedNodes()
  var selEdges = global.network.getSelectedEdges()
  if (nodeId != '') {
    selNodes = [nodeId]
  }
  if (selNodes && selNodes.length > 0) {
    deleteNode(selNodes)
  } else if (selEdges && selEdges.length > 0) {
    /**
		 *使用弹窗提示进行删除的方式
		for (var i in selEdges) {
			var edge = edges.get(selEdges[i]);
			new EdgeWindow(edge,"remove");
			break;
		}
		*/
    // deleteEdge(selEdges);
  }
}
/**
 * 删除连线
 * @param edge
 */
export function deleteEdge(edge) {
  var _es
  if (edge instanceof Array) {
    _es = edge
  } else {
    _es = [edge]
  }

  if (_es.length == 0) return

  var msg = ''
  if (_es.length == 1) {
    msg = '你确定要删除[' + global.edges.get(_es[0]).label + ']关系吗？'
  } else {
    msg = '你确定要删除选中的' + _es.length + '个关系吗？'
  }

  if (!confirm(msg)) {
    return
  }

  // 连线【关系】的删除操作，需要区分关系类型-1、系统关系类型2、自建关系类型
  // var zjgxids = []
  // for (var i = 0; i < _es.length; i++) {
  //   let edge = global.edges.get(_es[i])
  //   var rels = edge.rels
  //   for (var key in rels) {
  //     if (rels[key].attr && rels[key].attr == 'zjgx') {
  //       zjgxids.push(rels[key].id)
  //     }
  //   }
  // }

  global.edges.remove(_es)
}
/**
 * 删除节点和子节点
 * @param node
 */
function deleteNode(node) {
  var _ns = []
  if (node instanceof Array) {
    _ns = node
  } else {
    _ns.push(node.id)
  }

  if (_ns.length === 0) {
    return
  }

  var msg = ''
  if (_ns.length === 1) {
    msg = '你确定要删除[' + global.nodes.get(_ns[0]).label + ']节点吗？'
  } else {
    msg = '你确定要删除选中的' + _ns.length + '个节点吗？'
  }
  if (!confirm(msg)) {
    return
  }

  for (var i in _ns) {
    node = global.nodes.get(_ns[i])
    if (!node) {
      continue
    }

    // 1、删除节点和子节点
    // removeNode(node.id, false);

    // 2、只删除节点本身
    var es = global.network.getConnectedEdges(node.id)
    global.nodes.remove(node)
    global.edges.remove(es)
  }
}

/**
 * 保存关系图谱数据
 * @param mode ==> 1：保存, 2：共享 3：管理
 */
export function managerRelationData(mode) {
  switch (mode) {
    case '1':
      break
    case '2':
      break
    case '3':
      alert(2)
  }
}
/**
 * 将节点固定于窗口中心
 * @param _nodes
 */
export function centerNodes(_nodes) {
  var arr = []
  for (var i in _nodes) {
    var node = global.nodes.get(_nodes[i])
    node.x = _XconvertDOMtoCanvas($('#mynetwork').width() / 2)
    node.y = _YconvertDOMtoCanvas($('#mynetwork').height() / 2)
    node.physics = false

    arr.push(node)
  }

  addOrUpdateNode(arr, false, true)
}
/**
 * 判断画布中是否有数据
 * @returns {Boolean}
 */
export function hasData() {
  if (global.nodes && global.nodes.length > 0) {
    return true
  } else {
    return false
  }
}
export function buildExportData() {
  var results = []
  var ids = global.nodes.getIds()
  for (var i in ids) {
    var root = global.nodes.get(ids[i])
    // findChilds(root);
    results.push(root)
  }
  var edIds = global.edges.getIds()
  var edgs = []
  for (let i in edIds) {
    var edg = global.edges.get(edIds[i])
    edgs.push(edg)
  }
  return { nodes: results, edges: edgs }
}
// function findChilds (node, path) {
//   node.childs = [];

//   if (!path || path === '') { path = ','; }
//   path += node.id + ','

//   var cedges = global.edges.get({
//     filter: function (edge) {
//       return edge.from === node.id;
//     }
//   });

//   for (var i in cedges) {
//     var cnode = global.nodes.get(cedges[i].to);

//     if (path.indexOf(',' + cnode.id + ',') !== -1) { continue; }

//     if (path.split(',').length > 3) { continue; }

//     var n = buildNode(cnode, cedges[i], true);
//     n.pid = cedges[i].from;
//     node.childs.push(n);

//     findChilds(n, path);
//   }
// }
/* function buildNode(node, cedge, pointer) {
  var attr = {}
  var rels = []
  // 克隆属性
  for (var key in node.attributes) {
    attr[key] = node.attributes[key]
  }
  // 克隆关系数据
  if (cedge) {
    for (var i in cedge.rels) {
      var rel = { color: getCloneColor(node.color) }
      for (let key in cedge.rels[i]) {
        rel[key] = cedge.rels[i][key]
      }
      rels.push(rel)
    }
  } else {
    for (let i in node.rels) {
      let rel = { color: getCloneColor(node.color) }
      for (let key in node.rels[i]) {
        rel[key] = node.rels[i][key]
      }
      rels.push(rel)
    }
  }

  var n = {
    id: node.id,
    pid: node.pid,
    nodeType: node.nodeType,
    keyword: node.keyword,
    label: node.label,
    level: node.level,
    fontSize: node.fontSize,
    fontColor: node.fontColor,
    size: node.size,
    colorCode: node.colorCode,
    photoIcon: node.photoIcon,
    tagging: node.tagging,
    attributes: attr,
    rels: rels,
    childs: [],
    cached: node.cached,
    autoCached: node.autoCached,
    relationData: node.relationData,
  }

  if (node.isRoot) {
    n.isRoot = true
  }

  if (pointer) {
    var pos = global.network.getPositions([n.id])
    n.x = pos[n.id].x
    n.y = pos[n.id].y
  }

  return n
} */
/* function getCloneColor(color) {
  if (color && color.background) {
    return color.background
  } else {
    return color
  }
} */
/**
 * 坐标转换：canvas转DOM
 * LGG 2017-3-8
 */
// function getDomPointer (touch) {
//   return { x: _XconvertCanvastoDOM(touch.x), y: _YconvertCanvastoDOM(touch.y) };
// }

function _XconvertDOMtoCanvas(x) {
  return (
    (x - global.network.canvas.body.view.translation.x) /
    global.network.canvas.body.view.scale
  )
}
// function _XconvertCanvastoDOM (x) {
//   return x * global.network.canvas.body.view.scale + global.network.canvas.body.view.translation.x;
// }
/**
 * 因为菜单的原因，Y坐标需要偏移120
 * @param y
 * @returns {Number}
 */
function _YconvertDOMtoCanvas(y) {
  return (
    (y - global.network.canvas.body.view.translation.y) /
      global.network.canvas.body.view.scale -
    $('.mod-i2').height() -
    121 +
    'px' / global.network.canvas.body.view.scale
  )
}
// function _YconvertCanvastoDOM (y) {
//   return y * network.canvas.body.view.scale + network.canvas.body.view.translation.y + getMenuHeight();
// }
/**
 * 导出JSON
 */
export function exportJson() {
  var datas = buildExportData()
  let blob = new Blob([JSON.stringify(datas)])
  FileSaver.saveAs(blob, 'i2.json')
}
