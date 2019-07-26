import edges from './edges'
import nodes from './nodes'
import groups from './groups'
import interaction from './interaction'
import layout from './layout'
import manipulation from './manipulation'
import physics from './physics'

export default {
  autoResize: true,
  width: '100%',
  height: '100%',
  clickToUse: false,
  locale: 'cn',
  ...edges,
  ...nodes,
  ...groups,
  ...interaction,
  ...layout,
  ...manipulation,
  ...physics
}
