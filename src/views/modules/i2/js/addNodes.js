import api from '@/api/api'
export function addNodes (kw) {
  let key = kw
  let primary_key = {}
  let ns = []
  let ns1 = generateSystemNode(key)
  if (ns1 && ns1.length > 0) {
    ns = ns.concat(ns1)
  }
  // 没有查询到数据，添加为虚拟节点
  let kws = handleSpliter(key).split(',')
  let gkws = []
  for (let i in kws) {
    let kw = kws[i]
    let f = false
    for (let j in ns) {
      if (ns[j].id.indexOf(kw) !== -1) {
        f = true
        break
      }
    }
    if (f === false) {
      gkws.push(kw)
    }
  }
  let ns2 = generateCustomNode(gkws)
  if (ns2 && ns2.length > 0) {
    ns = ns.concat(ns2)
  }

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
  function generateCustomNode (kws) {

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
