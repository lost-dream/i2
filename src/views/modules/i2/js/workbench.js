import vis from 'vis/dist/vis'
import { ops } from './config/index'
let network
export function Workbench (id, vm) {
  let options = ops(vm);
  this.container = document.getElementById(id);
  this.nodes = new vis.DataSet([]);
  this.edges = new vis.DataSet([]);
  this.network = new vis.Network(this.container, { nodes: this.nodes, edges: this.edges }, options)
  this.init(vm);
}
Workbench.prototype.init = function(vm) {
  vm.global.nodes = this.nodes
  vm.global.edges = this.edges
  vm.global.network = this.network
  vm.global.container = this.container
  network = vm.global.network
  autoSetNetworkHeight()
  autoSetTabpanelHeight()
  $(window).resize(function() {
    autoSetNetworkHeight()
    autoSetTabpanelHeight()
  })
}
/**
 * 自动调节画布大小
 */
function autoSetNetworkHeight() {
  if (!network) {
  } else {
    network.setSize(
      $(window.document.body).width() + 'px',
      $('.mod-i2').height() - 121 + 'px',
    )
    network.redraw()
  }
}
function autoSetTabpanelHeight() {
  let height = $('.fun-sidebar .sidebar').height()
  let title = $('.fun-sidebar .sidebar')
    .find('.el-tabs__header')
    .height()
  !title && (title = 50)
  $('.fun-sidebar .sidebar')
    .find('.el-tabs__content')
    .height(height - title)
}
