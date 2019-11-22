<template>
  <div class="mod-i2">
    <div class="logo"></div>
    <el-tabs>
      <el-tab-pane label="开始">
        <ul class="tab-list">
          <li @click="addNodesHandle">
            <header class="addnode"></header>
            <footer>添加节点</footer>
          </li>
          <li @click="importNodeHandle">
            <header class="importNode"></header>
            <footer>导入节点</footer>
          </li>
          <li @click="cacheDataHandle">
            <header class="dataCacher"></header>
            <footer>数据缓存器</footer>
          </li>
          <li @click="addEdgeHandle">
            <header class="addRelation"></header>
            <footer>添加关系</footer>
          </li>
          <li @click="addDataCacheHandle">
            <header class="cacheData"></header>
            <footer>数据缓存</footer>
          </li>
          <li @click="lockNodeHandle">
            <header class="lock"></header>
            <footer>锁定</footer>
          </li>
          <li @click="unLockNodeHandle">
            <header class="unlock"></header>
            <footer>解锁</footer>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="编辑">
        <ul class="tab-list">
          <li @click="eidtNodeHandle">
            <header class="edit"></header>
            <footer>编辑</footer>
          </li>
          <li @click="deleteNodeHandle">
            <header class="del"></header>
            <footer>删除</footer>
          </li>
          <li @click="taggingHandle">
            <header class="mark"></header>
            <footer>一键标注</footer>
          </li>
          <li @click="remarkHandle">
            <header class="remarks"></header>
            <footer>备注</footer>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="布局">
        <ul class="tab-list">
          <li @click="autoLayoutHandle">
            <header class="auto"></header>
            <footer>自动</footer>
          </li>
          <li @click="rectangleHandle">
            <header class="rect"></header>
            <footer>矩形</footer>
          </li>
          <li @click="circleHandle">
            <header class="ring"></header>
            <footer>环形</footer>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="分析">
        <ul class="tab-list">
          <li @click="analysisHandle">
            <header class="wajue"></header>
            <footer>关系挖掘</footer>
          </li>
          <li @click="pairAnalyseHandle">
            <header class="fenxi"></header>
            <footer>两两分析</footer>
          </li>
          <li @click="overallRelationHandle">
            <header class="QJFX"></header>
            <footer>全局分析</footer>
          </li>
          <li @click="relationScoreSetter">
            <header class="qingmidu"></header>
            <footer>亲密度分析</footer>
          </li>
          <li @click="dxAnalysisHandle">
            <header class="DXFX"></header>
            <footer>定向分析</footer>
          </li>
          <li @click="archivesHandle">
            <header class="dangan"></header>
            <footer>档案</footer>
          </li>
          <li @click="trackballHandle">
            <header class="guiji"></header>
            <footer>轨迹</footer>
          </li>
          <li @click="unionCaseHandle">
            <header class="QB"></header>
            <footer>案件串并</footer>
          </li>
          <li @click="pzAnalysisHandle">
            <header class="PZBD"></header>
            <footer>碰撞对比分析</footer>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="算法">
        <ul class="tab-list">
          <li @click="centralityHandle">
            <header class="center"></header>
            <footer>中心性</footer>
          </li>
          <li @click="shortPathHandle">
            <header class="ZDLJ"></header>
            <footer>最短路径</footer>
          </li>
          <li @click="shortPathHandle('isAllShortPath')">
            <header class="road"></header>
            <footer>全路径</footer>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="协同工作">
        <ul class="tab-list">
          <li @click="jsonImportHandle">
            <header class="importNode"></header>
            <footer>导入(JSON)</footer>
          </li>
          <li>
            <header class="exportNode"></header>
            <footer>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  导出<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="exportJson">
                    JSON
                  </el-dropdown-item>
                  <el-dropdown-item command="exportExcel">
                    Excel
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </footer>
          </li>
          <li @click="saveRelatonData">
            <header class="baocun"></header>
            <footer>保存</footer>
          </li>
          <li @click="shareRelationData">
            <header class="gongxiang"></header>
            <footer>共享</footer>
          </li>
          <li @click="managerRelationData">
            <header class="guanli"></header>
            <footer>管理</footer>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
    <div class="menubar">
      <!-- <sidebar>
        <sidemenu-item></sidemenu-item>
      </sidebar> -->
    </div>
    <div class="fun-sidebar">
      <sidebar type="tabpanel">
        <sidefun :detail="basicInfo" ref="sidebarControl"></sidefun>
      </sidebar>
    </div>
    <div id="mainpanel" class="mainpanel">
      <div id="mynetwork"></div>
    </div>
    <!-- rightmenu -->
    <div
      id="rightMenu"
      style="z-index: 1000; display: none; position: absolute; width: 80px;"
    >
      <div class="menuInner">
        <ul class="menuList">
          <li>
            <a href="#">分析</a>
            <dl class="subMenu">
              <dd>
                <a href="#" @click="analysisHandle">关系挖掘</a>
              </dd>
              <dd>
                <a href="#" @click="dxAnalysisHandle">定向分析</a>
              </dd>
              <dd>
                <a href="#" @click="overqjHandle(contextNodeId)">全局分析</a>
              </dd>
            </dl>
          </li>
          <li>
            <a href="#">操作</a>
            <dl class="subMenu">
              <dd><a href="#" @click="archivesHandle">档案</a></dd>
              <dd><a href="#" @click="trackballHandle">轨迹</a></dd>
            </dl>
          </li>
          <li>
            <a href="#">节点</a>
            <dl class="subMenu">
              <dd>
                <a href="#" @click="eidtNodeHandle">编辑</a>
              </dd>
              <dd><a href="#" @click="deleteNodeHandle">删除</a></dd>
              <dd><a href="#" @click="taggingHandle">一键标注</a></dd>
            </dl>
          </li>
          <li><a href="#" @click="nodeFocus">聚焦</a></li>
          <li>
            <a href="#" @click="lockNodeCheck">{{ lockCheck }}</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 边的右键菜单 -->
    <div
      id="edgeContextMenu"
      style="z-index: 1000; display: none; position: absolute; width: 80px;"
    >
      <div class="menuInner">
        <ul class="menuList">
          <li><a href="#" @click="modifyEdgeHandle">修改关系</a></li>
          <li><a href="#" @click="deleteEdgeHandle">删除关系</a></li>
        </ul>
      </div>
    </div>
    <fly-dialog
      class="custompos"
      width="400px"
      title="导入"
      :show.sync="importVisible"
      @beforeCloseDialog="importVisible = false"
    >
      <div class="importNode">
        <el-upload
          class="upload-demo"
          ref="upload"
          action=""
          :on-change="importHandleChange"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <div slot="tip" class="el-upload__tip">
            只能上传json文件，且不超过500kb
          </div>
        </el-upload>
      </div>
    </fly-dialog>
    <!-- 弹窗, 新增节点 -->
    <add-nodes v-if="addNodesVisible" ref="addNodes"> </add-nodes>
    <!-- 弹窗，数据缓存器 -->
    <cache-data
      v-if="cacheDataVisible"
      ref="cacheData"
      @saveData="saveCheckedData"
    ></cache-data>
    <!-- 弹窗，添加关系 -->
    <edit-edge v-if="editEdgeVisible" ref="editEdge"></edit-edge>
    <!-- 弹窗，修改关系 -->
    <modify-edge v-if="modifyEdgeVisible" ref="modifyEdge"></modify-edge>
    <!-- 弹窗，编辑节点 -->
    <modify-node v-if="modifyNodeVisible" ref="modifyNode"></modify-node>
    <!-- 弹窗，备注 -->
    <remark v-if="remarkVisible" ref="remark"></remark>
    <!-- 弹窗，分析 关系挖掘 -->
    <analysis v-if="analysisVisible" ref="analysis"></analysis>
    <!-- 弹窗，分析 亲密度 -->
    <relation-score
      v-if="relationScoreSetVisible"
      ref="relationScoreSet"
    ></relation-score>
    <!-- 弹窗，分析 碰撞对比 -->
    <pz-analysis v-if="pzAnalysisVisible" ref="pZanalysis"></pz-analysis>
    <!-- 弹窗，协同工作管理 -->
    <manager-relation
      v-if="managerRelationVisible"
      ref="managerRelation"
    ></manager-relation>
    <!-- 弹窗，协同工作共享 -->
    <share-relation
      v-if="shareRelationVisible"
      ref="shareRelation"
    ></share-relation>
    <!-- 弹窗, 协同工作保存 -->
    <save-relation
      v-if="saveRelationVisible"
      ref="saveRelation"
    ></save-relation>
  </div>
</template>

<script>
import FlyDialog from '@/components/fly-dialog'
import Sidebar from '@/views/common/Sidebar'
// import SidemenuItem from '@/views/common/SidemenuItem'
import Sidefun from './Sidefun'
import AddNodes from './AddNodes'
import CacheData from './CacheData'
import EditEdge from './EditEdgeWindow'
import ModifyNode from './ModifyNodeWindow'
import ModifyEdge from './ModifyEdgeWindow'
import Remark from './RemarkWindow'
import ManagerRelation from './ManagerRelationWindow'
import SaveRelation from './SaveRelationWindow'
import ShareRelation from './ShareRelationWindow'
import Analysis from './AnalysisWindow'
import RelationScore from './RelationScoreSetWindow'
import PzAnalysis from './PZanalysisWindow'
import { Workbench } from './js/workbench'
import { expandNode } from './js/expandNode'
import { rectangle, circle } from './js/layout'
import {
  lockNode,
  unNockNode,
  deleteOperation,
  deleteEdge,
  hasData,
  buildExportData,
  exportJson,
} from './js/common'
import { exportJsonToExcel } from '@/assets/js/Export2Excel'
import { Node } from './js/entity/Node'
import { flatten } from '@/utils'
// import {}

export default {
  name: 'i2',
  metaInfo: {
    title: 'i2',
  },
  components: {
    FlyDialog,
    Sidebar,
    // SidemenuItem,
    Sidefun,
    AddNodes,
    CacheData,
    EditEdge,
    ModifyNode,
    ModifyEdge,
    Remark,
    ManagerRelation,
    ShareRelation,
    SaveRelation,
    Analysis,
    RelationScore,
    PzAnalysis,
  },
  data() {
    return {
      addNodesVisible: false,
      cacheDataVisible: false,
      editEdgeVisible: false,
      modifyNodeVisible: false,
      modifyEdgeVisible: false,
      remarkVisible: false,
      remarkNum: 0, // 点击一键标注的次数
      managerRelationVisible: false,
      saveRelationVisible: false,
      shareRelationVisible: false,
      analysisVisible: false,
      relationScoreSetVisible: false,
      pzAnalysisVisible: false,
      importVisible: false,
      contextNodeId: '', // 右键当前id
      contextEdgeId: '',
      basicInfo: {
        idNumber: '',
        name: '',
        nation: '',
        sex: '',
        birthday: '',
        cellphone: '',
        currentAddress: '',
      },
      lockCheck: '锁定',
      checkedData: '', // 屏幕上选中的点
    }
  },
  computed: {
    network() {
      return this.global.network
    },
  },
  methods: {
    // 导入json
    jsonImportHandle() {
      this.importVisible = true
    },
    // 导入
    importHandleChange(file) {
      let _this = this
      var name = file.name // 读取选中文件的文件名
      var size = file.size // 读取选中文件的大小
      console.log('文件名:' + name + '大小:' + size)

      var reader = new FileReader() // 这是核心,读取操作就是由它完成.
      reader.readAsText(file.raw) // 读取文件的内容,也可以读取文件的URL
      reader.onload = function() {
        // 当读取完成后回调这个函数,然后此时文件的内容存储到了result中,直接操作即可
        let jsonObj = JSON.parse(this.result)
        let edgesList = jsonObj.edges
        let nodesList = jsonObj.nodes.map(item => {
          return new Node(item, _this.global.network, _this.global.nodes)
        })
        for (let i = 0; i < nodesList.length; i++) {
          if (_this.global.nodes.getIds().indexOf(nodesList[i].id) < 0) {
            _this.global.nodes.add(nodesList[i])
          }
        }
        for (var j = 0; j < edgesList.length; j++) {
          if (_this.global.edges.getIds().indexOf(edgesList[j].id) < 0) {
            _this.global.edges.add(edgesList[j])
          }
        }
        _this.importVisible = false
      }
    },
    // 显示添加节点面板
    addNodesHandle() {
      this.addNodesVisible = true
      this.$nextTick(() => {
        this.$refs.addNodes.init()
      })
    },
    // 点击导入节点
    importNodeHandle() {
      this.$nextTick(() => {
        this.$refs.sidebarControl.init('2', '导入节点', 'ImportNodes')
      })
    },
    // 点击数据缓存器--显示面板
    cacheDataHandle() {
      this.cacheDataVisible = true
      this.$nextTick(() => {
        this.$refs.cacheData.init()
      })
    },
    // 点击添加关系
    addEdgeHandle() {
      // this.unbindEvent();// 解绑事件，不然会导致添加关系失效
      this.global.edge_adding = true
      this.network.addEdgeMode()
    },
    // 修改关系
    modifyEdgeHandle() {
      this.modifyEdgeVisible = true
      var edge = this.global.edges.get(this.contextEdgeId)
      this.$nextTick(() => {
        this.$refs.modifyEdge.init(edge)
      })
      this.removeEdgeMenu()
    },
    // 删除关系
    deleteEdgeHandle() {
      deleteEdge([this.contextEdgeId])
      this.removeEdgeMenu()
    },
    // 点击缓存数据
    addDataCacheHandle() {
      let arr = this.network.getSelectedNodes() // 获取选中节点的ID
      if (arr.length <= 0) {
        this.$message({
          message: '请选择要缓存的节点！',
          type: 'error',
          duration: 1500,
        })
        return
      }
      let addAllCacheParam = [] // 缓存数据变量
      for (var i = 0; i < arr.length; i++) {
        addAllCacheParam.push({
          keywords: this.global.nodes.get(arr[i]).keyword,
          name: this.global.nodes.get(arr[i]).label,
          dataType: this.global.nodes.get(arr[i]).nodeType,
          folderId: this.global.nodes.get(arr[i]).folderId,
          description: this.global.nodes.get(arr[i]).keyword,
        }) // 缓存本页数据
      }
      this.$api
        .dataCacheSaveOrUpdate('save', {
          json: addAllCacheParam,
          userName: JSON.parse(this.$Cookies.get('user_info')).username,
        })
        .then(({ data }) => {
          if (data && data.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
            })
          }
        })
    },
    lockNodeCheck() {
      if (this.global.nodes.get(this.contextNodeId).physics === false) {
        this.unLockNodeHandle()
        this.removeMenu()
      } else {
        this.lockNodeHandle()
        this.removeMenu()
      }
    },
    // 点击锁定
    lockNodeHandle() {
      console.log()
      var arr =
        this.contextNodeId != ''
          ? [this.contextNodeId]
          : this.network.getSelectedNodes()
      lockNode(arr)
    },
    // 解锁
    unLockNodeHandle() {
      var arr =
        this.contextNodeId != ''
          ? [this.contextNodeId]
          : this.network.getSelectedNodes()
      unNockNode(arr)
    },
    // 节点编辑
    eidtNodeHandle() {
      let arr =
        this.contextNodeId != ''
          ? [this.contextNodeId]
          : this.network.getSelectedNodes()
      if (arr.length > 0) {
        // 修改节点
        for (var i in arr) {
          var node = this.global.nodes.get(arr[i])
          this.modifyNodeVisible = true
          this.$nextTick(() => {
            this.$refs.modifyNode.init(node)
          })
          break
        }
      }
      this.removeMenu()
    },
    // 节点删除
    deleteNodeHandle() {
      deleteOperation(this.contextNodeId)
      this.removeMenu()
    },
    // 一键标注
    taggingHandle() {
      this.remarkNum++
      const selectedId =
        this.contextNodeId !== ''
          ? [this.contextNodeId]
          : this.network.getSelectedNodes()
      let node = this.network.body.nodes[selectedId]

      if (this.remarkNum % 2 === 0) {
        node.setOptions({
          color: {
            highlight: {
              background: '#ffffff',
            },
          },
        })
      } else {
        node.setOptions({
          color: {
            highlight: {
              background: '#e58628',
            },
          },
        })
      }
      this.network.redraw()
      // for (let i in arr) {
      //   let node = this.global.nodes.get(arr[i])
      //   node.taggingState()
      // }
    },
    // 备注
    remarkHandle() {
      let arr = this.global.network.getSelectedNodes()
      for (let i in arr) {
        var node = this.global.nodes.get(arr[i])
        this.remarkVisible = true
        this.$nextTick(() => {
          this.$refs.remark.init(node)
        })
        break
      }
    },
    // 聚焦
    nodeFocus() {
      this.focusNode([this.contextNodeId])
      this.removeMenu()
    },
    // 布局---自动
    autoLayoutHandle() {
      var arr = this.global.network.getSelectedNodes()
      unNockNode(arr)
    },
    // 布局--- 矩形
    rectangleHandle() {
      var left
      let arr = this.global.network.getSelectedNodes()
      if (arr.length === 1) {
        arr = arr.concat(this.global.network.getConnectedNodes(arr[0]))
        left = this.global.network.getPositions(arr[0])[arr[0]]
      }
      rectangle(arr, left)
    },
    // 布局--- 环形
    circleHandle() {
      let arr = this.global.network.getSelectedNodes()
      if (arr.length === 1) {
        var center = this.global.network.getPositions(arr[0])[arr[0]]
        arr = this.global.network.getConnectedNodes(arr[0])
        circle(arr, center)
      } else {
        circle(arr)
      }
    },
    // 分析--- 关系挖掘
    analysisHandle() {
      let arr =
        this.contextNodeId != ''
          ? [this.contextNodeId]
          : this.network.getSelectedNodes()
      for (let i in arr) {
        let node = this.global.nodes.get(arr[i])
        this.analysisVisible = true
        this.$nextTick(() => {
          this.$refs.analysis.init(node)
        })
        break
      }
      this.removeMenu()
    },
    // 分析--- 两两分析
    pairAnalyseHandle() {
      let arr = this.global.network.getSelectedNodes()
      if (arr.length !== 2) {
        this.$message({
          message: '请选择两个节点！',
          type: 'error',
          duration: 1500,
        })
        return
      }
      let kws = arr.map(item => {
        return this.global.nodes.get(item).keyword
      })
      this.$api
        .nodePairAnalyse({ keyword1: kws[0], keyword2: kws[1] })
        .then(({ data }) => {
          if (data && data.code === 200) {
            let edges = data.result.edges
            edges.map(value => {
              value.step = Number(value.from.toString() + value.to.toString())
            })

            let edgesList = []

            for (let item1 of edges) {
              let flag = true
              for (let item2 of edgesList) {
                if (item1.step === item2.step) {
                  flag = false
                  item2.label = item2.label + '/' + item1.label
                }
              }
              if (flag) {
                edgesList.push(item1)
              }
            }

            if (edgesList.length !== 0) {
              for (let j = 0; j < edgesList.length; j++) {
                if (this.global.edges.getIds().indexOf(edgesList[j].id) < 0) {
                  this.global.edges.add(edgesList[j])
                }
              }
            } else {
              this.$message({
                message: '没有找到关系！',
                type: 'error',
                duration: 1500,
              })
            }
          }
        })
    },
    // 分析--- 全局分析
    overallRelationHandle() {
      let selectNodes = this.global.network.getSelectedNodes()
      const nodes = []
      let nodeRes = [] // 和所选节点有直接关系的所有节点
      if (!selectNodes || selectNodes.length < 1) {
        this.$message({
          message: '请选中节点后再执行此操作',
          type: 'error',
          duration: 1500,
        })
        return false
      }

      selectNodes.forEach(value => {
        nodes.push(this.global.network.getConnectedNodes(value))
      })

      nodeRes = flatten(nodes) // 降成一维数组
      nodeRes = [...nodeRes, selectNodes] // 把选中的点也包含进来（有关系的点集合本身不包含选中的点）
      nodeRes = [...new Set(nodeRes)] // 点集合去重
      this.global.network.fit()
      this.global.network.selectNodes(nodeRes)

      // this.focusNode(selectNodes)
      this.removeMenu()
    },
    overqjHandle(nodeId) {
      // this.focusNode([nodeId])
      // this.removeMenu()
    },
    // 分析--- 亲密度分析
    relationScoreSetter() {
      let arr = this.global.network.getSelectedNodes()
      for (let i in arr) {
        let node = this.global.nodes.get(arr[i])
        this.relationScoreSetVisible = true
        this.$nextTick(() => {
          this.$refs.relationScoreSet.init(node)
        })
        break
      }
    },
    // 分析--- 定向分析
    dxAnalysisHandle() {
      let selectNodes =
        this.contextNodeId != ''
          ? [this.contextNodeId]
          : this.network.getSelectedNodes()
      if (!selectNodes || selectNodes.length < 1) {
        this.$message({
          message: '请选中节点后再执行此操作',
          type: 'error',
          duration: 1500,
        })
        return false
      }
      this.$nextTick(() => {
        this.$refs.sidebarControl.init(
          '2',
          '定向分析',
          'DynamicTabDX',
          selectNodes,
        )
      })
      this.removeMenu()
    },
    // 档案
    archivesHandle() {
      let selectNodes =
        this.contextNodeId != ''
          ? [this.contextNodeId]
          : this.network.getSelectedNodes()
      if (!selectNodes || selectNodes.length < 1) {
        this.$message({
          message: '请选中节点后再执行此操作',
          type: 'error',
          duration: 1500,
        })
        return false
      }
      let node = this.global.nodes.get(selectNodes[0])
      let routeData = this.$router.resolve({
        name: 'archives',
        query: { keyword: node.keyword },
      })
      window.open(routeData.href, '_blank')
      this.removeMenu()
    },
    // 轨迹
    trackballHandle() {
      let selectNodes =
        this.contextNodeId != ''
          ? [this.contextNodeId]
          : this.network.getSelectedNodes()
      if (!selectNodes || selectNodes.length < 1) {
        this.$message({
          message: '请选中节点后再执行此操作',
          type: 'error',
          duration: 1500,
        })
        return false
      }
      let node = this.global.nodes.get(selectNodes[0])
      let routeData = this.$router.resolve({
        name: 'timespacelist',
        query: {
          idNumber: node.keyword,
        },
      })
      window.open(routeData.href, '_blank')
      this.removeMenu()
    },
    // 联案分析
    unionCaseHandle() {
      let arr = this.global.network.getSelectedNodes()
      if (arr.length !== 2) {
        this.$message({
          message: '请选择两个节点！',
          type: 'error',
          duration: 1500,
        })
        return
      }
      let kws = arr.map(item => {
        return this.global.nodes.get(item).keyword
      })
      let routeData = this.$router.resolve({
        name: 'unioncase',
        query: {
          kw1: kws[0],
          kw2: kws[1],
        },
      })
      window.open(routeData.href, '_blank')
    },
    // 分析--- 碰撞对比
    pzAnalysisHandle() {
      let arr = this.global.network.getSelectedNodes()
      if (arr.length === 0) {
        arr = this.global.nodes.getIds()
      }
      if (arr.length === 0) {
        this.$message({
          message: '没有可分析的数据！',
          type: 'error',
          duration: 1500,
        })
        return false
      }
      for (let i in arr) {
        let node = this.global.nodes.get(arr[i])
        this.pzAnalysisVisible = true
        this.$nextTick(() => {
          this.$refs.pZanalysis.init(node)
        })
        break
      }
    },
    // 算法-- 中心性
    centralityHandle() {
      let selectNodes = this.global.network.getSelectedNodes()
      if (!selectNodes || selectNodes.length < 2) {
        this.$message({
          message: '请选中多个节点后再执行此操作！',
          type: 'error',
          duration: 1500,
        })
        return false
      }
      this.$nextTick(() => {
        this.$refs.sidebarControl.init('2', '中心性分析', 'Centrality')
      })
    },
    // 算法-- 六度空间
    shortPathHandle(isAllShort) {
      let selectNodes = this.global.network.getSelectedNodes()
      if (!selectNodes || selectNodes.length < 2) {
        this.$message({
          message: '请选中多个节点后再执行此操作！',
          type: 'error',
          duration: 1500,
        })
        return false
      }
      let ns = [
        this.global.nodes.get(selectNodes[0]),
        this.global.nodes.get(selectNodes[1]),
      ]
      let params = {
        keyword1: ns[0].keyword,
        keyword2: ns[1].keyword,
        opeFlag: 'shortest',
      }
      if (isAllShort) {
        params.opeFlag = 'all'
      }
      this.$api.sixDegree(params).then(({ data }) => {
        if (data && data.code === 200) {
          if (
            !data.result ||
            !data.result.nodes ||
            data.result.nodes.length === 0
          ) {
            this.$message({
              message: '没有查询到关系数据！',
              type: 'error',
              duration: 1500,
            })
          } else {
            let edgesList = data.result.edges
            let nodesList = data.result.nodes.map(item => {
              return new Node(item, this.global.network, this.global.nodes)
            })
            for (let i = 0; i < nodesList.length; i++) {
              if (this.global.nodes.getIds().indexOf(nodesList[i].id) < 0) {
                this.global.nodes.add(nodesList[i])
              }
            }
            for (var j = 0; j < edgesList.length; j++) {
              if (this.global.edges.getIds().indexOf(edgesList[j].id) < 0) {
                this.global.edges.add(edgesList[j])
              }
            }
          }
        }
      })
    },
    // 协同工作 --- 导出
    handleCommand(command) {
      if (command === 'exportJson') {
        if (!hasData()) {
          this.$message({
            message: '没有可以导出的数据！',
            type: 'error',
            duration: 1500,
          })
          return false
        }
        exportJson()
      } else if (command === 'exportExcel') {
        if (!hasData()) {
          this.$message({
            message: '没有可以导出的数据！',
            type: 'error',
            duration: 1500,
          })
          return false
        }

        const table = [
          {
            label: '证件号码',
            width: '',
            prop: 'keyword',
          },
          {
            label: '节点类型',
            width: '',
            prop: 'nodeType',
          },
        ]
        require.ensure([], () => {
          let tHeader = []
          let filterVal = []
          table.forEach(val => {
            tHeader.push(val.label)
            filterVal.push(val.prop)
          })
          const list = buildExportData().nodes

          list.map(value => {
            switch (value.nodeType) {
              case 'Car':
                value.nodeType = '车'
                break
              case 'Case':
                value.nodeType = '案'
                break
              case 'DrivingLicense':
                value.nodeType = '驾照'
                break
              case 'Household':
                value.nodeType = '户口'
                break
              default:
                value.nodeType = '人'
            }
          })

          const data = list.map(v => filterVal.map(j => v[j]))
          exportJsonToExcel(tHeader, data, 'i2')
        })
      }
    },
    // 协同工作 -- 保存
    saveRelatonData() {
      if (!hasData()) {
        this.$message({
          message: '没有可以保存的数据！',
          type: 'error',
          duration: 1500,
        })
        return
      }
      var datas = buildExportData()
      this.saveRelationVisible = true
      this.$nextTick(() => {
        this.$refs.saveRelation.init(datas)
      })
    },
    // 协同工作-- 共享
    shareRelationData() {
      this.shareRelationVisible = true
      this.$nextTick(() => {
        this.$refs.shareRelation.init()
      })
    },
    // 协同工作 -- 管理
    managerRelationData() {
      this.managerRelationVisible = true
      this.$nextTick(() => {
        this.$refs.managerRelation.init()
      })
    },
    // network绑定事件
    bindEvent() {
      // 单击节点查看详情
      this.network.on('click', this.clickEvent)
      // 双击节点展开关系
      this.network.on('doubleClick', this.doubleclickEvent)
      // 右键
      this.network.on('oncontext', this.oncontextEvent)
    },
    // 解绑事件
    unbindEvent() {
      this.network.off('click', this.clickEvent)
      this.network.off('doubleClick', this.doubleclickEvent)
      this.network.off('oncontext', this.oncontextEvent)
    },
    /**
     * 单击事件
     */
    clickEvent(params) {
      this.removeMenu()
      this.removeEdgeMenu()
      // 框选时，不执行单击操作
      if (
        params.event.changedPointers[0].shiftKey === true ||
        this.global.mutilSelectStatus === true
      ) {
        return
      }

      if (params.nodes.length === 1) {
        // 点击的是节点

        // 查看节点详情
        this.showBasicInfo(params)
        // 刷新定向分析窗体
        // refreshDxAnalysisWind();
      } else if (params.edges.length === 1) {
        // 点击的是连线
        // var edge = this.global.edges.get(params.edges[0]);
        /** 在dark状态时，点击连线，节点无法恢复正常状态的 bug处理 start */
        // nomalNodes([edge.from, edge.to]);
        // nomalNodes([edge.from, edge.to]);
        /** 在dark状态时，点击连线，节点无法恢复正常状态的 bug处理 end */
      }
    },
    /**
     * 双击事件
     * @param {*} params
     */
    doubleclickEvent(params) {
      if (params.nodes.length === 1) {
        var curNode = this.global.nodes.get(params.nodes[0])
        expandNode(this, curNode)
      }
    },
    /**
     * 右键事件
     */
    oncontextEvent(params) {
      params.event.returnValue = false
      var pointer = {
        x: params.pointer.DOM.x,
        y: params.pointer.DOM.y,
      }
      var nodeId = this.network.getNodeAt(pointer)
      var edgeId
      if (!nodeId) edgeId = this.network.getEdgeAt(pointer)
      // 显示右键菜单
      if (nodeId + 1) {
        this.contextNodeId = nodeId
        if (this.global.nodes.get(nodeId).physics === false) {
          this.lockCheck = '解锁'
        } else {
          this.lockCheck = '锁定'
        }
        this.showContextMenu(nodeId, pointer)
      } else if (edgeId) {
        this.contextEdgeId = edgeId
        this.showEdgeContextMenu(edgeId, pointer)
      } else {
        // 阻止默认事件，屏蔽右键空白画布事件
        var event = params.event
        event.preventDefault()
        this.removeMenu()
        this.removeEdgeMenu()
        // 右键空白--显示添加节点、关系等全局功能菜单
      }
    },
    // 显示边右键菜单
    showEdgeContextMenu(edgeId, pointer) {
      $('#edgeContextMenu').css({
        left: pointer.x,
        top: pointer.y + 121,
        display: 'block',
      })
    },
    removeEdgeMenu() {
      this.contextEdgeId = ''
      $('#edgeContextMenu').css({
        display: 'none',
      })
    },
    // 显示节点右键菜单
    showContextMenu(nodeId, pointer) {
      // let curNode = this.global.nodes.get(nodeId)
      $('#rightMenu').css({
        left: pointer.x,
        top: pointer.y + 121,
        display: 'block',
      })
    },
    removeMenu() {
      this.contextNodeId = ''
      $('#rightMenu').css({
        display: 'none',
      })
    },
    /**
     * 查看人节点基本信息
     */
    showBasicInfo(params) {
      try {
        let { nodeType, keyword } = this.global.nodes.get(params.nodes[0])
        if (this.isSideBarOpening()) {
          if (nodeType === 'Person') {
            this.$api.nodeFindDetail({ nodeType, keyword }).then(({ data }) => {
              if (data && data.code === 200) {
                this.basicInfo = data.result
              }
            })
          }
        }
      } catch (e) {
        console.info(e)
      }
    },
    /**
     * 定位到某个节点
     */
    focusNode(node) {
      var options = {
        scale: 1.5,
        offset: { x: 0, y: 0 },
        animation: {
          duration: 1000,
          easingFunction: 'easeInOutQuad',
        },
      }
      for (let i in node) {
        this.network.focus(node[i], options)
      }
      this.network.selectNodes(node, true)
    },
    /**
     *  判断sidebar 是否展开
     */
    isSideBarOpening() {
      return true
    },
    saveCheckedData(data) {
      console.log('aaaaa====' + data)
      this.checkedData = data
    },
  },
  created() {},
  mounted() {
    // 初始化画布
    /* eslint-disable no-new */
    new Workbench('mynetwork', this)
    // 绑定network事件
    this.bindEvent()
  },
  beforeDestroy() {
    sessionStorage.removeItem('relation_type_list')
  },
}
</script>
<style lang="stylus" scoped>
>>>.el-dropdown
  display inline-block
  position relative
  color #fff
  font-size 14px
>>>.el-tabs__header
  background rgba(44, 239, 255, 0.5)
  margin-bottom 0
  .el-tabs__nav-wrap::after
    height 0
  .el-tabs__nav
    float none
    text-align center
  .el-tabs__item
    color #fff
    height 50px
    line-height 50px
    width 80px
    padding 0
    text-align center
  .el-tabs__item.is-active
    color #e58628
    border-bottom none
  .el-tabs__active-bar
    height 0
    background-color transparent
>>>.el-tabs__content
  height 72px
>>>.el-tab-pane
  background rgba(44, 239, 255, 0.3)
  height 100%

.mod-i2
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  overflow hidden
  background url('~@/assets/img/i2bg.png') no-repeat center
  background-size cover
  .logo
    background url('~@/assets/img/i2logo.png') no-repeat
    height 40px
    width 85px
    position fixed
    z-index 999
    left 50%
    // 每个tab宽80px，共六个，图片本身85px
    margin-left -(80 * 6 / 2px + 85px)
    top 5px

.tab-list
  display flex
  height 100%
  justify-content center
  li
    position relative
    width 120px
    height 100%
    padding 0 20px
    cursor pointer
    overflow hidden
    display flex
    flex-direction column
    justify-content center
    align-items center
    &:after
      content ''
      position absolute
      width 10px
      height 100%
      top: 4px
      right: -10px
      border-radius 12px / 80px
      box-shadow 0 0 2px #2cefff
    header
      width 31px
      height 27px
      margin-bottom 10px
      $iconList = addnode importNode dataCacher addRelation cacheData lock unlock edit del mark remarks rect dangan exportNode baocun gongxiang guanli ring auto wajue fenxi QJFX qingmidu DXFX guiji QB PZBD center ZDLJ road
      for item, index in $iconList
        &.{item}
          background url('./icons/' + item + '.png') center / contain no-repeat
    footer
      color #fff
      line-height 1

    .tab-li
      width 80px
      text-align center
      overflow hidden
      height 100%
      display block
      .operate-icon
        width 31px
        height 27px
        margin 12px auto 0
        $iconList = addnode importNode dataCacher addRelation cacheData lock unlock edit del mark remarks rect dangan exportNode baocun gongxiang guanli ring auto wajue fenxi QJFX qingmidu DXFX guiji QB PZBD center ZDLJ road
        for item, index in $iconList
          &.{item}
            background url('./icons/' + item + '.png') center / contain no-repeat
      .operate-desc
        color #fff
        height 25px
        line-height 25px
        margin-top 5px
    .or-spacer-vertical
      float left
      margin 15px 0 0 10px
      .mask
        overflow hidden
        width 10px
        height 50px
        &:after
          content ''
          display block
          margin-left -10px
          width 10px
          height 100%
          border-radius 12px / 80px
          box-shadow 0 0 2px #2cefff
.menubar>.sidebar
  left 0
.fun-sidebar >.sidebar
  background-color rgba(44, 239, 255, 0.3)
  right 0
  bottom 0
  width 295px
>>>.fun-sidebar .sidebar-inner
  width 330px
#rightMenu
  background rgba(30,158,174,0.58)
  .menuList
    li
      position relative
      .subMenu
        position absolute
        right -80px
        top 0
        width 80px
        background rgba(21,155,172,0.6)
        display none
      &:hover
        >.subMenu
          display block
      a
        display block
        padding 5px
        text-align center
        font-size 14px

#edgeContextMenu
  background rgba(2, 106, 118, 0.9)
  .menuList
    li
      position relative
      .subMenu
        position absolute
        right -80px
        top 0
        width 80px
        background #159bac8c
        display none
        a
          display block
          padding 5px
          text-align center
    li:hover >.subMenu
      display block
    li >a
      display block
      padding 5px
      text-align center
.importNode
  padding 10px
  .el-upload__tip
    color #fff
>>>.el-upload-list__item-name
  color #fff
  &:hover
    color #17b3a3
</style>
