export function Edge(node) {
  $.extend(
    this,
    {
      from: '',
      to: '',
      label: '',
      selectionWidth: 2,
      lineWidth: 1,
      dashes: false,
      node: node,
    },
    {},
  )
  this.init = function() {
    this.from = this.node.pid
    this.to = this.node.id
  }
  this.init()
}
