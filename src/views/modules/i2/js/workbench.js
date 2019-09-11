import vis from 'vis/dist/vis'
import options from './config/index'
import { addNodes } from './addNodes'
let network
let nodes
let edges
let rt
export function Workbench () {
  this.init()
}
Workbench.prototype.init = function () {
  let defaultId = 'mynetwork'
  let container = document.getElementById(defaultId)
  nodes = new vis.DataSet([])
  edges = new vis.DataSet([])
  network = new vis.Network(container, {
    nodes,
    edges
  }, options)
  binkNetwork()
  autoSetNetworkHeight()
  autoSetTabpanelHeight()
  $(window).resize(() => {
    window.clearTimeout(rt)
    rt = setTimeout(() => {
      autoSetTabpanelHeight()
      autoSetNetworkHeight()
    }, 10)
  })
}
Workbench.prototype.addNodes = function (kw) {
  addNodes(kw, nodes)
}
/**
 * 绑定network事件
 */
function binkNetwork () {
  bindEvent()
}
/**
 * 绑定事件
 */
function bindEvent () {
  // 单击事件
  network.on('click', clickEvent)
  // 双击事件
  network.on('doubleClick', doubleclickEvent)
  // 右键菜单
  network.on('oncontext', oncontextEvent)
  // 选中节点时
  network.on('selectNode', selectNodeEvent)
}
/**
 * 单击事件
 * @param {*} params
 */
function clickEvent (params) {
  alert('单击事件')
}
/**
 * 双击事件
 * @param {*} params
 */
function doubleclickEvent (params) {
  alert('双击事件')
}
/**
 * 右键菜单
 * @param {*} params
 */
function oncontextEvent (params) {
  alert('右键菜单')
}
/**
 * 节点被选中时触发
 * @param {*} params
 */
function selectNodeEvent (params) {
  alert('节点被选中时触发')
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
/**
 * 自动获取tab-panel高度
 */
let autoSetTabpanelHeight = () => {
  let height = $('.fun-sidebar .sidebar').height()
  let title = $('.fun-sidebar .sidebar').find('.el-tabs__header').height()
  !title && (title = 50)
  $('.fun-sidebar .sidebar').find('.el-tabs__content').height(height - title)
}
