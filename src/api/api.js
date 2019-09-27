import http from '@/utils/httpRequest'

export default {
  /**
   * 通过用户和密码登录
   * @param {*} username 用户名
   * @param {*} password 密码
   */
  login (username, password) {
    return http({
      url: http.adornUrl('login'),
      method: 'post',
      data: http.adornData({
        username: username,
        password: password
      })
    })
  },
  /**
   * 通过token获取用户信息
   * @param {*} token 令牌
   */
  getUserInfo (token) {
    return http({
      url: http.adornUrl('/user/info'),
      method: 'get',
      params: http.adornParams({
        token
      })
    })
  },
  // ------------------------------------I2---------------------------------------------//
  /**
   * 数据缓存--批量通过id删除
   * @param {*} ids
   */
  dataCacheDelByIds (ids) {

  },
  /**
  * 数据缓存--通过id获取缓存数据
  * @param {*} id
  */
  dataCacheGetById (id) {
    return http({
      url: http.adornUrl('i2/cacheDataCtlr/get/' + id),
      method: 'get',
      params: http.adornParams()
    })
  },
  /**
   * 数据缓存--获取全部数据
   * @param {*}
   */
  dataCacheGetAll () {

  },
  /**
   * 数据缓存--初始化缓存节点数据获取接口
   * @param {*}
   */
  getAllCacheDataByUserName (data) {
    return http({
      url: http.adornUrl('i2/cacheDataCtlr/getAllCacheDataByUsername'),
      method: 'get',
      params: http.adornParams(
        data
      )
    })
  },
  /**
   * 数据缓存--分页获取
   * @param {*}
   */
  getByPage () {

  },
  /**
   * 数据缓存--初始化缓存节点数据获取接口
   * @param {*}
   */
  getCacheDataByFolderId () {

  },
  /**
   * 数据缓存--复制或移动缓存数据
   * @param {*}
   */
  dataCacheMoveOrCopy (data) {
    return http({
      url: http.adornUrl('i2/cacheDataCtlr/moveOrCopy'),
      method: 'post',
      data: http.adornData(data)
    })
  },
  /**
  * 数据缓存--缓存数据新增接口
  * @param {*}
  */
  dataCacheSaveOrUpdate (addr, data) {
    if (addr) {
      addr = addr === 'save' ? 'saveCacheData' : 'update';
    }
    return http({
      url: http.adornUrl('i2/cacheDataCtlr/' + addr),
      method: 'post',
      data: http.adornData(data)
    })
  },
  /**
  * 数据缓存--缓存数据筛选接口
  * @param {*}
  */
  dataCacheSearch (data) {
    return http({
      url: http.adornUrl('i2/cacheDataCtlr/searchCacheData'),
      method: 'get',
      params: http.adornParams(data)
    })
  },
  /**
   * 数据缓存--缓存数据筛选接口
   * @param {*}
   */
  dataCacheUpdate () {

  },
  /**
   * 数据缓存文件夹--；批量通过id删除
   * @param {*}
   */
  folderDelByIds () {

  },
  /**
   * 数据缓存文件夹--；通过id获取
   * @param {*}
   */
  getFolderById () {

  },
  /**
   * 数据缓存文件夹--；获取全部文件夹
   * @param {*}
   */
  getAllFolder () {
    return http({
      url: http.adornUrl('i2/folderCtlr/getAllFolderByUsername'),
      method: 'get',
      params: http.adornParams()
    })
  },
  /**
   * 数据缓存文件夹--；获取用户所有文件夹接口
   * @param {*}
   */
  getAllFolderByUserName (username) {
    return http({
      url: http.adornUrl('i2/folderCtlr/getAllFolderByUsername'),
      method: 'get',
      params: http.adornParams(
        {
          username: username
        }
      )
    })
  },
  /**
  * 数据缓存文件夹--文件夹保存
  * @param {*}
  */
  folderSave () {

  },
  /**
  * 数据缓存文件夹--文件夹更新
  * @param {*}
  */
  folderUpdate () {

  },
  /**
  * 节点与关系操作--关系图谱关系挖掘接口
  * @param {*}
  */
  nodeDigRelation () {

  },
  /**
  * 节点与关系操作--图谱分析添加节点接口
  * @param {*}
  */
  queryNodeOrAdd (data) {
    return http({
      url: http.adornUrl('i2/nodeAndRelationCtlr/findNode'),
      method: 'get',
      params: http.adornParams({
        param: data
      })
    })
  },
  /**
  * 节点与关系操作--图谱分析单击节点展开关系
  * @param {*}
  */
  nodeSpreadRelation () {

  },
  /**
   * 节点详情--人员标签删除接口
   * @param {*}
   */
  nodeDetailDelTag () {

  },
  /**
  * 节点详情--查看节点详情
  * @param {*}
  */
  nodeFindDetail ({ nodeType, keyword }) {
    return http({
      url: http.adornUrl('i2/nodeDetailCtlr/findNodeDetail'),
      method: 'get',
      params: http.adornParams({
        nodeType,
        keyword
      })
    })
  },
  /**
  * 节点详情--人员标签添加接口
  * @param {*}
  */
  savePersonTag (data) {
    return http({
      url: http.adornUrl('i2/nodeDetailCtlr/saveTag'),
      method: 'post',
      data: http.adornData(data)
    })
  },
  // ------------------------------------ticket---------------------------------------------//
  /**
   * 通过用户和密码登录
   * @param {*} username 用户名
   * @param {*} password 密码
   */
  newly (from) {
    return http({
      url: http.adornUrl('/ticket/statement/newly'),
      method: 'post',
      data: http.adornData(from)
    })
  },
  // ------------------------------------relation---------------------------------------------//
  /**
   * 通过用户和密码登录
   * @param {*} username 用户名
   * @param {*} password 密码
   */
  // ------------------------------------timespace---------------------------------------------//
  /**
   * 通过用户和密码登录
   * @param {*} username 用户名
   * @param {*} password 密码
   */
  spacequery (from) {
    return http({
      url: http.adornUrl('/spacequery'),
      method: 'post',
      data: http.adornData(from)
    })
  }
  // ------------------------------------unioncase---------------------------------------------//
  /**
   * 通过用户和密码登录
   * @param {*} username 用户名
   * @param {*} password 密码
   */

}
