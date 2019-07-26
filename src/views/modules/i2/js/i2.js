import vis from 'vis/dist/vis'
import options from './config/index'
let network // 画布对象
let nodes // 所有节点
var edges // 所有边
/**
 * 创建network
 */
let Workbench = function () {
  this.init()
}
Workbench.prototype.init = function () {
  var defaultId = 'mynetwork'
  this.createNewSheet(defaultId)
}
Workbench.prototype.createNewSheet = function (id) {
  var container = document.getElementById(id)
  /* eslint-disable no-new */
  new Sheet(container)
}
let Sheet = function (container) {
  this.container = container
  nodes = new vis.DataSet([
    { id: 1, label: 'Node 1', x: -250, y: -300, shape: 'circularImage', image: './nodeImg/download.png' },
    { id: 2, label: 'Node 2', x: -100, y: -100, shape: 'image', image: './nodeImg/tel.png' },
    { id: 3, label: 'Node 3', x: -400, y: -50, shape: 'image', image: './nodeImg/person.png' },
    { id: 4, label: 'Node 4', x: -200, y: -50, shape: 'image', image: './nodeImg/m.jpg' }
  ]) // 所有节点
  edges = new vis.DataSet([
    { from: 1, to: 2, label: '同行', title: 'hello' },
    { from: 1, to: 3, label: '同住' },
    { from: 1, to: 4, label: '子女' }
  ]) // 所有边
  network = new vis.Network(container, {
    nodes: nodes,
    edges: edges
  }, options)
}

/**
 * 自动获取tab-panel高度
 */
let autoSetTabpanelHeight = () => {
  let height = $('.fun-sidebar .sidebar').height()
  let title = $('.fun-sidebar .sidebar').find('.el-tabs__header').height()
  !title && (title = 50)
  $('.fun-sidebar .sidebar').find('.el-tabs__content').height(height - title)
}
/**
 * 自动调节画布大小
 */
let autoSetNetworkHeight = () => {
  if (!network) {

  } else {
    network.setSize($(window.document.body).width() + 'px', $('.mod-i2').height() - 121 + 'px')
    network.redraw()
  }
}
let i2 = {
  autoSetTabpanelHeight,
  autoSetNetworkHeight,
  Workbench
}
export default i2
