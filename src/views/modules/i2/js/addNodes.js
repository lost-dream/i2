import api from '@/api/api'
export function addNodes (kw, nodes) {
  let key = kw
  let primaryKey = {}
  let ns = []
  let ns1 = generateSystemNode(key)
  if (ns1 && ns1.length > 0) {
    ns = ns.concat(ns1)
  }
  // 没有查询到数据，添加为虚拟节点
  let kws = handleSpliter(key).split(',')
  let gkws = []
  for (let i in kws) {
    let k = kws[i]
    let f = false
    for (let j in ns) {
      // if (ns[j].id.indexOf(k) != -1) {
      //   f = true
      //   break
      // }
    }
    if (f === false) {
      gkws.push(k)
    }
  }
  let ns2 = generateCustomNode(gkws)
  if (ns2 && ns2.length > 0) {
    ns = ns.concat(ns2)
  }
  ns.map(function (e) {
    e.isRoot = true
  })
  // 添加节点到界面
  expandChilds(ns, 2)

  /**
   * 生成系统内建节点
   */
  function generateSystemNode (kw) {
    // 将输入的关键字格式化
    let key = handleSpliter(kw)
    console.log(key)
    let ns = api.queryNode(key)
    console.log(ns)
    return ns
  }
  /**
   * 生成虚拟节点
   * @param {*} kws
   */
  function generateCustomNode (keys) {
    if (!keys) {
      keys = handleSpliter(key).split(',')
    }
    let ns = []
    for (let i in keys) {
      let params = {}
      for (let j in primaryKey) {
        let item = primaryKey[j]
        params[item.name] = keys[i]
      }
      let attributes = {
        params: JSON.stringify(params)
      }
      let rels = []
      // 创建节点
      let newNode = createNewNode(keys[i], keys[i], attributes, rels)
      ns.push(newNode)
    }
    return ns
  }
  /**
   * 是否展开子节点
   * @param {*} childs
   * @param {0: 不自动展开 1：自动展开 2：强制展开} mode
   */
  function expandChilds (childs, mode) {
    addNodeToCanvas(childs, childs.length)
  }
  /**
   * 添加数据到画布
   * @param {*} childs
   * @param {只显示多少条数据} count
   */
  function addNodeToCanvas (childs, count) {
    let subnodes = []
    // let newedges = []
    // let updateNodes = []
    // let autoExpandNodes = []
    // let ids = nodes.getIds()
    for (let idx in childs) {
      if (count && idx >= count) {
        break
      }
      let node = childs[idx]
      // let obj = new Node(node)
      subnodes.push(node)
    }
    addOrUpdateNode(subnodes, true)
  }
  /**
   * 添加或者更新节点
   * @param {*} node
   * @param {true 时，如果画布上已经存在此id的节点，则合并现有数据} merge
   * @param {true 更新时是否保持现有位置不变} physics
   */
  function addOrUpdateNode (node, merge, physics) {
    let data = {
      add: [],
      update: []
    }
    if (!(node instanceof Array)) {
      node = [node]
    }
    for (let i in node) {
      data.add.push(node[i])
    }
    if (data.add.length > 0) {
      nodes.add(data.add)
    }
  }
  /**
   * 创建新节点
   * @param {*} id
   * @param {*} label
   */
  function createNewNode (id, label) {
    let newNode = {
      id: id,
      label: label
    }
    return newNode
  }
  /**
   * 把换行符换成逗号
   */
  function handleSpliter (val) {
    let str = val
    try {
      str = str.replace(/\n|\r\n| /g, ',')
    } catch (e) {
      console.info(e)
    }
    return str
  }
}
