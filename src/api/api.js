import http from '@/utils/httpRequest'
export default {
  /**
   * 通过token获取用户信息
   * @param {*} token 令牌
   */
  getUserInfo(token) {
    return http({
      url: http.adornUrl('/user/info'),
      method: 'get',
      params: http.adornParams({
        token,
      }),
    })
  },
  // ------------------------------------home---------------------------------------------//
  /**
   * 点击菜单
   */
  statistics(data) {
    return http({
      url: http.adornUrl('admin/statistics'),
      method: 'post',
      params: http.adornParams(data),
    })
  },
  // statistics(ids) {
  //   return http({
  //     url: http.adornUrl(
  //       `admin/statistics?id=${ids.id}&userId=${ids.userId}&accessToken=${
  //         ids.accessToken
  //       }`,
  //     ),
  //     method: 'post',
  //   })
  // },
  /**
   * 最近使用
   */
  statisticsQuery(data) {
    return http({
      url: http.adornUrl('admin/statisticsQuery'),
      method: 'post',
      params: http.adornParams(data),
    })
  },
  /**
   * 在线
   */
  statisticsLogs(data) {
    return http({
      url: http.adornUrl('admin/statisticsLogs'),
      method: 'get',
      params: http.adornParams(data),
    })
  },
  // ------------------------------------I2---------------------------------------------//
  /**
   * 展开节点
   * @param {*} data
   */
  queryDataByCluster(data) {
    return http({
      url: http.adornUrl('i2s/i2/nodeAndRelationCtlr/spreadRelation'),
      method: 'get',
      params: http.adornParams(data),
    })
  },
  /**
   * 节点上传
   */
  importExcelNode(data) {
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    return http.post(
      http.adornUrl(`i2s/i2/nodeAndRelationCtlr/importNode`),
      data,
      config,
    )
  },
  /**
   * 数据缓存--批量通过id删除
   * @param {*} ids
   */
  dataCacheDelByIds(ids) {
    return http({
      url: http.adornUrl('i2s/i2/cacheDataCtlr/delByIds'),
      method: 'post',
      data: http.adornData(ids, false),
    })
  },
  /**
   * 数据缓存--通过id获取缓存数据
   * @param {*} id
   */
  dataCacheGetById(id) {
    return http({
      url: http.adornUrl('i2s/i2/cacheDataCtlr/get/' + id),
      method: 'get',
      params: http.adornParams(),
    })
  },
  /**
   * 数据缓存--获取全部数据
   * @param {*}
   */
  dataCacheGetAll() {},
  /**
   * 数据缓存--初始化缓存节点数据获取接口
   * @param {*}
   */
  getAllCacheDataByUserName(data) {
    return http({
      url: http.adornUrl('i2s/i2/cacheDataCtlr/getAllCacheDataByUsername'),
      method: 'get',
      params: http.adornParams(data),
    })
  },
  /**
   * 数据缓存--分页获取
   * @param {*}
   */
  getByPage() {},
  /**
   * 数据缓存--初始化缓存节点数据获取接口
   * @param {*}
   */
  getCacheDataByFolderId() {},
  /**
   * 数据缓存--复制或移动缓存数据
   * @param {*}
   */
  dataCacheMoveOrCopy(data) {
    return http({
      url: http.adornUrl('i2s/i2/cacheDataCtlr/moveOrCopy'),
      method: 'post',
      data: http.adornData(data),
    })
  },
  /**
   * 数据缓存--缓存数据新增接口
   * @param {*}
   */
  dataCacheSaveOrUpdate(addr, data) {
    if (addr) {
      addr = addr === 'save' ? 'saveCacheData' : 'update'
    }
    return http({
      url: http.adornUrl('i2s/i2/cacheDataCtlr/' + addr),
      method: 'post',
      data: data,
    })
  },
  /**
   * 数据缓存--缓存数据筛选接口
   * @param {*}
   */
  dataCacheSearch(data) {
    return http({
      url: http.adornUrl('i2s/i2/cacheDataCtlr/searchCacheData'),
      method: 'get',
      params: http.adornParams(data),
    })
  },
  /**
   * 数据缓存--缓存数据筛选接口
   * @param {*}
   */
  dataCacheUpdate() {},
  /**
   * 数据缓存文件夹--；批量通过id删除
   * @param {*}
   */
  folderDelByIds() {},
  /**
   * 数据缓存文件夹--；通过id获取
   * @param {*}
   */
  getFolderById() {},
  /**
   * 数据缓存文件夹--；获取全部文件夹
   * @param {*}
   */
  getAllFolder() {
    return http({
      url: http.adornUrl('i2s/i2/folderCtlr/getAllFolderByUsername'),
      method: 'get',
      params: http.adornParams(),
    })
  },
  /**
   * 数据缓存文件夹--；获取用户所有文件夹接口
   * @param {*}
   */
  getAllFolderByUserName(data) {
    return http({
      url: http.adornUrl('i2s/i2/folderCtlr/getAllFolderByUsername'),
      method: 'get',
      params: http.adornParams(data),
    })
  },
  /**
   * 数据缓存文件夹--文件夹保存
   * @param {*}
   */
  folderSave() {},
  /**
   * 数据缓存文件夹--文件夹更新
   * @param {*}
   */
  folderUpdate() {},
  /**
   * 节点与关系操作--关系图谱关系挖掘接口
   * @param {*}
   */
  nodeDigRelation(data) {
    return http({
      url: http.adornUrl('i2s/i2/nodeAndRelationCtlr/digRelation'),
      method: 'get',
      params: http.adornParams(data),
    })
  },
  /**
   * 分析--- 两两分析
   * @param {*} data
   */
  nodePairAnalyse(data) {
    return http({
      url: http.adornUrl('i2s/i2/nodeAndRelationCtlr/pairAnalyse'),
      method: 'get',
      params: http.adornParams(data),
    })
  },
  /**
   * 分析--- 定向分析
   * @param {*} data
   */
  directionalAnalyse(data) {
    return http({
      url: http.adornUrl('i2s/i2/nodeAndRelationCtlr/directionalAnalyse'),
      method: 'post',
      data: http.adornData(data, false),
    })
  },
  /**
   * 碰撞对比
   * @param {*} data
   */
  collideAnalyse(data) {
    return http({
      url: http.adornUrl('i2s/i2/nodeAndRelationCtlr/collideAnalyse'),
      method: 'post',
      data: http.adornData(data, false),
    })
  },
  /**
   * 获取所有关系类型
   */
  getAllRelationType() {
    return http({
      url: http.adornUrl('i2s/i2/nodeAndRelationCtlr/getAllRelationType'),
      method: 'get',
      params: http.adornParams(),
    })
  },
  /**
   * 六度空间
   */
  sixDegree(data) {
    return http({
      url: http.adornUrl('i2s/i2/nodeAndRelationCtlr/sixDegree'),
      method: 'get',
      params: http.adornParams(data),
    })
  },
  /**
   * 节点与关系操作--图谱分析添加节点接口
   * @param {*}
   */
  queryNodeOrAdd(data) {
    return http({
      url: http.adornUrl('i2s/i2/nodeAndRelationCtlr/findNode'),
      method: 'post',
      data: http.adornData(data, false),
    })
  },
  /**
   * 节点与关系操作--图谱分析单击节点展开关系
   * @param {*}
   */
  nodeSpreadRelation() {},
  /**
   * 节点详情--人员标签删除接口
   * @param {*}
   */
  nodeDetailDelTag() {},
  /**
   * 节点详情--查看节点详情
   * @param {*}
   */
  nodeFindDetail({ nodeType, keyword }) {
    return http({
      url: http.adornUrl('i2s/i2/nodeDetailCtlr/findNodeDetail'),
      method: 'get',
      params: http.adornParams({
        nodeType,
        keyword,
      }),
    })
  },
  /**
   * 节点详情--人员标签添加接口
   * @param {*}
   */
  savePersonTag(data) {
    return http({
      url: http.adornUrl('i2s/i2/nodeDetailCtlr/saveTag'),
      method: 'post',
      data: http.adornData(data),
    })
  },
  /**
   * 节点详情-- 人员标签删除
   * @param {*} data
   */
  deletePersonTag(data) {
    return http({
      url: http.adornUrl('i2s/i2/nodeDetailCtlr/deleteTag'),
      method: 'get',
      params: http.adornParams(data),
    })
  },
  /**
   * 协同工作--保存分析记录
   */
  saveAnalyticalRecords(data) {
    return http({
      url: http.adornUrl('i2s/i2/nodeAndRelationCtlr/saveAnalyticalRecords'),
      method: 'post',
      data: http.adornData(data),
    })
  },
  /**
   * 协同工作 -- 管理分析记录列表
   * @param {*} data
   */
  listAllAnalyticalRecords(data) {
    return http({
      url: http.adornUrl('i2s/i2/nodeAndRelationCtlr/listAllAnalyticalRecords'),
      method: 'get',
      params: http.adornParams(data),
    })
  },
  /**
   * 协同工作 -- 管理分析记录删除
   * @param {*} data
   */
  deleteAnalyticalRecords(data) {
    return http({
      url: http.adornUrl('i2s/i2/nodeAndRelationCtlr/deleteAnalyticalRecords'),
      method: 'get',
      params: http.adornParams(data),
    })
  },
  /**
   * 协同工作 -- 管理分析记录加载
   * @param {*} data
   */
  loadAnalyticalRecords(data) {
    return http({
      url: http.adornUrl('i2s/i2/nodeAndRelationCtlr/loadAnalyticalRecords'),
      method: 'get',
      params: http.adornParams(data),
    })
  },
  /**
   * 关系分析
   */
  aggregationAnalyse(data) {
    return http({
      url: http.adornUrl('i2s/i2/nodeAndRelationCtlr/aggregationAnalyse'),
      method: 'post',
      data: http.adornData(data),
    })
  },
  /**
   *  关系分析--对比分析
   * @param {*} data
   */
  compareAnalyse(data) {
    return http({
      url: http.adornUrl('i2s/i2/nodeAndRelationCtlr/compareAnalyse'),
      method: 'post',
      data: http.adornData(data),
    })
  },
  /**
   * 协同工作 -- 管理共享
   * @param {*} data
   */
  shareAnalyticalRecords(data) {
    return http({
      url: http.adornUrl('i2s/i2/nodeAndRelationCtlr/shareAnalyticalRecords'),
      method: 'get',
      params: http.adornParams(data),
    })
  },
  // ------------------------------------ticket---------------------------------------------//
  /**
   * 新建话单
   */
  newly(data) {
    return http({
      url: http.adornUrl('ticket/statement/newly'),
      method: 'post',
      data: http.adornData(data),
    })
  },
  /**
   * 话单查询
   */
  ticketQuery(data) {
    return http({
      url: http.adornUrl('ticket/statement/ticketQuery'),
      method: 'post',
      data: http.adornData(data, false),
    })
  },
  /**
   * (单)话单查询展示
   */
  ticketOneAnalyze(data) {
    console.log(process.env.VUE_APP_COMMON_REQUEST_URL)
    return http({
      url: http.adornUrl(
        'ticket/statement/ticketOneAnalyze?id=' +
          data.id +
          '&phone=' +
          data.phone,
      ),
      method: 'post',
      // data: http.adornData(data, false),
      // data: http.adornData(data, false),
    })
  },
  /**
   * (多)话单查询展示
   */
  /*  ticketOneAnalyze2(data) {
    return http({
      url: http.adornUrl(
        'ticket/statement/ticketOneAnalyze2?id=' +
          data.id +
          '&phone=' +
          data.phone,
      ),
      method: 'post',
      // data: http.adornData(data, false),
      // data: http.adornData(data, false),
    })
  }, */
  ticketOneAnalyze2(data) {
    return http({
      url: http.adornUrl('ticket/statement/ticketOneAnalyze2'),
      method: 'post',
      data: http.adornData(data, false),
    })
  },
  /**
   * 全网通查询展示
   */
  ticketNoteQuery(data) {
    return http({
      url: http.adornUrl('ticket/statement/ticketNoteQuery'),
      method: 'post',
      data: http.adornData(data, false),
    })
  },
  /**
   * 话单删除
   */
  ticketDelete(data) {
    return http({
      url: http.adornUrl('ticket/statement/ticketDelete'),
      method: 'get',
      params: http.adornParams(data, false),
    })
  },

  /**
   * 通话查询展示
   */
  ticketCallQuery(data) {
    return http({
      url: http.adornUrl('ticket/statement/ticketCallQuery'),
      method: 'post',
      data: http.adornData(data, false),
    })
  },

  /**
   * 话单编辑
   */
  ticketAlter(data) {
    return http({
      url: http.adornUrl('ticket/statement/ticketAlter'),
      method: 'post',
      data: http.adornData(data),
    })
  },

  /**
   * 话单案件名称
   */
  ticketOneName() {
    return http({
      url: http.adornUrl('ticket/statement/ticketOneName'),
      method: 'post',
    })
  },

  /**
   * 话单案件电话
   */
  ticketOnePhone(data) {
    return http({
      url: http.adornUrl('ticket/statement/ticketOnePhone?caseName=' + data),
      method: 'post',
      // data: http.adornData(data,false)
    })
  },

  /**
   * 数据筛选
   */
  callFilter(condition, data) {
    return data.filter(item => {
      return Object.keys(condition).every(key => {
        return String(item[key])
          .toLowerCase()
          .includes(
            String(condition[key])
              .trim()
              .toLowerCase(),
          )
      })
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
  spacequery(from) {
    return http({
      url: http.adornUrl('/spacequery'),
      method: 'post',
      data: http.adornData(from),
    })
  },
  // ------------------------------------unioncase---------------------------------------------//
  /**
   * 添加案件
   */
  queryTCase(data) {
    return http({
      url: http.adornUrl('relations/queryTCase?caseNoArr=' + data),
      method: 'get',
    })
  },
  /**
   * 任务管理-分析
   */
  analyze(data) {
    return http({
      url: http.adornUrl(
        'relations/analyze?id=' + data.id + '&userId=' + data.userId,
      ),
      method: 'get',
    })
  },
  /**
   * 任务管理-查看分析结果
   */
  analyzeTaskResult(data) {
    return http({
      url: http.adornUrl(
        'relations/analyzeTaskResult?id=' +
          data.id +
          '&page=' +
          data.page +
          '&pageSize=' +
          data.pageSize,
      ),
      method: 'get',
    })
  },
  /**
   * 任务管理-逻辑删除
   */
  deleteTask(data) {
    return http({
      url: http.adornUrl('relations/deleteTask?id=' + data.id),
      method: 'get',
    })
  },
  /**
   * 任务管理-获取编辑前信息
   */
  queryCompile(data) {
    return http({
      url: http.adornUrl('relations/queryCompile?id=' + data.id),
      method: 'get',
    })
  },
  /**
   * 任务管理-查看list
   */
  queryTaskManagementList(data) {
    return http({
      url: http.adornUrl(
        'relations/queryTaskManagementList?name=' +
          data.name +
          '&status=' +
          data.status +
          '&userId=' +
          data.userId +
          '&pageSize=' +
          data.pageSize +
          '&page=' +
          data.page,
      ),
      method: 'get',
    })
  },
  /**
   * 任务管理-保存编辑信息
   */
  saveCompile(data) {
    return http({
      url: http.adornUrl('relations/saveCompile?queryTCase=' + data),
      method: 'get',
    })
  },
  /**
   * 创建任务and串并案件
   */
  seriesParallel(data) {
    console.log(data)
    return http({
      url: http.adornUrl('relations/seriesParallel'),
      method: 'post',
      data: http.adornData(data, false),
    })
  },
  /**
   * 任务管理-轨迹点查询返回网吧宾馆-坐标
   */
  tracing(data) {
    return http({
      url: http.adornUrl(
        'relations/tracing?idNumber=' +
          data.idNumber +
          '&activeTimeBegin=' +
          data.activeTimeBegin +
          '&activeTimeEnd=' +
          data.activeTimeEnd +
          '&typeBgWb=' +
          data.typeBgWb,
      ),
      method: 'get',
    })
  },
}
