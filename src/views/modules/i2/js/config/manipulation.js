/**
 * 操作
 */
export default {
  manipulation: {
    // 是否启用编辑
    enabled: false,
    // 添加节点
    addNode: function (data, callback) {
      console.log('添加节点')
      callback(data)
    },
    // 编辑节点
    editNode: function (data, callback) {
      console.log('编辑节点')
      callback(data)
    },
    // 添加连线
    addEdge: function (data, callback) {
      console.log('添加连线')
      if (data.from === data.to) {
        var r = confirm('Do you want to connect the node to itself?');
        if (r === true) {
          callback(data);
        }
      } else {
        callback(data);
      }
    }
  }
}
