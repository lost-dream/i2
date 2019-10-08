import global from "@/utils/global";
import { getEdgesZjgxConnectings, createZjgxEdge } from "../common";
/**
 * 操作
 */
export default {
  manipulation: {
    // 是否启用编辑
    enabled: false,
    // 添加节点
    addNode: function(data, callback) {
      console.log("添加节点");
      callback(data);
    },
    // 编辑节点
    editNode: function(data, callback) {
      console.log("编辑节点");
      callback(data);
    },
    // 添加连线
    addEdge: function(data, callback) {
      if (data.from === data.to || global.edge_adding === false) {
        return;
      }
      // 首先根据两个节点获取之间的连线
      var edge = {};
      var edgeId = getEdgesZjgxConnectings(data.from, data.to);
      if (!edgeId) {
        edgeId = getEdgesZjgxConnectings(data.to, data.from);
        if (!edgeId) {
          // 建立新关系
          edge = createZjgxEdge(data.from, data.to);
        } else {
          edge = global.edges.get(edgeId);
        }
      } else {
        edge = global.edges.get(edgeId);
      }
      callback(edge);
    }
  }
};
