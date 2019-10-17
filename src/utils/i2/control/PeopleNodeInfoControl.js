export function PeopleNodeInfoControl(_this, node) {
  this.node = node
  this.init = function() {
    this.queryNodeDetail(function(res) {
      console.log(res)
      // _this.basicInfo = res
    })
  }

  this.queryNodeDetail = function(callback) {
    var data = {
      nodesType: this.node.nodeType,
      mysqlId: this.node.mysqlId,
    }
    $.ajax({
      type: 'GET',
      url: window.SITE_CONFIG.baseUrl + 'i2/nodeDetailCtlr/findNodeDetail',
      contentType: 'application/json;charset=utf-8',
      dataType: 'json',
      data: data,
      success: callback,
    })
  }
  this.init()
}
