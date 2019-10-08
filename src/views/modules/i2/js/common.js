import global from "@/utils/global";
import { Edge } from "./entity/Edge";
/**
 * 添加或者更新节点
 * @param {*} node
 * @param {*} merge: true 如果画布上已经存在此id的节点，则合并现有数据
 * @param {*} physics： true 更新时是否保持现有位置不变
 */
export function addOrUpdateNode(node, merge, physics) {
  let data = {
    add: [],
    update: []
  };
  if (!(node instanceof Array)) {
    node = [node];
  }
  for (let i in node) {
    if (global.nodes.getIds().indexOf(node[i].id) === -1) {
      data.add.push(node[i]);
    } else {
      if (merge === true) {
        var n = global.nodes.get(node[i].id);
        n.merge(node[i]);
        data.update.push(node[n]);
      } else {
        data.update.push(node[i]);
      }
    }
  }
  if (data.add.length > 0) {
    global.nodes.add(data.add);
  }
  if (data.update.length > 0) {
    // 更新时是否保持现有位置不变，physics = true
    if (physics === true) {
      for (let i in data.update) {
        if (
          data.update[i].physics === undefined ||
          data.update[i].physics === true
        ) {
          data.update[i].x = undefined;
          data.update[i].y = undefined;
          data.update[i].physics = false;
          data.update[i].hiddenPhysics = true;
        }
      }
      global.nodes.update(data.update);
      for (let i in data.update) {
        if (data.update[i].hiddenPhysics === true) {
          data.update[i].physics = true;
          data.update[i].hiddenPhysics = undefined;
        }
      }
    }
    global.nodes.update(data.update);
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
  return $(obj).hasClass("disabled");
}
// 获取连接两个节点a和b的边的id ---自建关系
export function getEdgesZjgxConnectings(a, b) {
  var edge = global.edges.get({
    filter: function(edge) {
      return (
        edge.from === a &&
        edge.to === b &&
        edge.attributes.relationType === "zjgx"
      );
    }
  })[0];

  if (edge instanceof Object) {
    return edge.id;
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
    pid: from
  };
  var edge = new Edge(node);
  return edge;
}
