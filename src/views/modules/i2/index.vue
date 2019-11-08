<template>
  <div class="mod-i2 i2-bg">
    <nav class="navbar-fixed-top">
      <div class="header-container">
        <div class="logo"></div>
        <div class="tab-container">
          <el-tabs>
            <el-tab-pane label="开始">
              <ul class="tab-list clearfix">
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                    @click="addNodesHandle"
                  >
                    <dt class="operate-icon operate-addBatch addnode"></dt>
                    <dd class="operate-desc">添加节点</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnImportNode"
                    class="tab-li"
                    @click="importNodeHandle"
                  >
                    <dt class="operate-icon operate-addBatch importNode"></dt>
                    <dd class="operate-desc">导入节点</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl id="btnCacheData" class="tab-li" @click="cacheDataHandle">
                    <dt class="operate-icon operate-addBatch dataCacher"></dt>
                    <dd class="operate-desc">数据缓存器</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl id="btnAddEdge" class="tab-li" @click="addEdgeHandle">
                    <dt class="operate-icon operate-addBatch addRelation"></dt>
                    <dd class="operate-desc">添加关系</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnAddDatacache"
                    class="tab-li"
                    @click="addDataCacheHandle"
                  >
                    <dt class="operate-icon operate-addBatch cacheData"></dt>
                    <dd class="operate-desc">数据缓存</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl id="btnLock" class="tab-li" @click="lockNodeHandle">
                    <dt class="operate-icon operate-addBatch lock"></dt>
                    <dd class="operate-desc">锁定</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl id="btnUnlock" class="tab-li" @click="unLockNodeHandle">
                    <dt class="operate-icon operate-addBatch unlock"></dt>
                    <dd class="operate-desc">解锁</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <!-- <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">选择</dd>
                  </dl>
                </li> -->
              </ul>
            </el-tab-pane>
            <el-tab-pane label="编辑">
              <ul class="tab-list clearfix">
                <li>
                  <dl id="btnEidt" class="tab-li" @click="eidtNodeHandle">
                    <dt class="operate-icon operate-addBatch edit"></dt>
                    <dd class="operate-desc">编辑</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnDeleteNode"
                    class="tab-li"
                    @click="deleteNodeHandle"
                  >
                    <dt class="operate-icon operate-addBatch del"></dt>
                    <dd class="operate-desc">删除</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl id="btnTagging" class="tab-li" @click="taggingHandle">
                    <dt class="operate-icon operate-addBatch mark"></dt>
                    <dd class="operate-desc">一键标注</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl id="btnRemark" class="tab-li" @click="remarkHandle">
                    <dt class="operate-icon operate-addBatch remarks"></dt>
                    <dd class="operate-desc">备注</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <!-- <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">隐藏</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl id="btnBatchAddNode" class="tab-li">
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">显示</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li> -->
              </ul>
            </el-tab-pane>
            <el-tab-pane label="布局">
              <ul class="tab-list clearfix">
                <li>
                  <dl
                    id="btnAutoLayout"
                    class="tab-li"
                    @click="autoLayoutHandle"
                  >
                    <dt class="operate-icon operate-addBatch auto"></dt>
                    <dd class="operate-desc">自动</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl id="btnRectangle" class="tab-li" @click="rectangleHandle">
                    <dt class="operate-icon operate-addBatch rect"></dt>
                    <dd class="operate-desc">矩形</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl id="btnCircle" class="tab-li" @click="circleHandle">
                    <dt class="operate-icon operate-addBatch ring"></dt>
                    <dd class="operate-desc">环形</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="分析">
              <ul class="tab-list clearfix">
                <li>
                  <dl id="btnAnalysis" class="tab-li" @click="analysisHandle">
                    <dt class="operate-icon operate-addBatch wajue"></dt>
                    <dd class="operate-desc">关系挖掘</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnPairAnalyse"
                    class="tab-li"
                    @click="pairAnalyseHandle"
                  >
                    <dt class="operate-icon operate-addBatch fenxi"></dt>
                    <dd class="operate-desc">两两分析</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnOverallRelation"
                    class="tab-li"
                    @click="overallRelationHandle"
                  >
                    <dt class="operate-icon operate-addBatch QJFX"></dt>
                    <dd class="operate-desc">全局分析</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnRelatiaonScoreSetter"
                    class="tab-li"
                    @click="relationScoreSetter"
                  >
                    <dt class="operate-icon operate-addBatch qingmidu"></dt>
                    <dd class="operate-desc">亲密度分析</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnDXAnalysis"
                    class="tab-li"
                    @click="dxAnalysisHandle"
                  >
                    <dt class="operate-icon operate-addBatch DXFX"></dt>
                    <dd class="operate-desc">定向分析</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl id="btnArchives" class="tab-li" @click="archivesHandle">
                    <dt class="operate-icon operate-addBatch dangan"></dt>
                    <dd class="operate-desc">档案</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl id="btnTrackball" class="tab-li" @click="trackballHandle">
                    <dt class="operate-icon operate-addBatch guiji"></dt>
                    <dd class="operate-desc">轨迹</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl id="btnUnionCase" class="tab-li" @click="unionCaseHandle">
                    <dt class="operate-icon operate-addBatch QB"></dt>
                    <dd class="operate-desc">案件串并</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnPZAnalysis"
                    class="tab-li"
                    @click="pzAnalysisHandle"
                  >
                    <dt class="operate-icon operate-addBatch PZBD"></dt>
                    <dd class="operate-desc">碰撞对比分析</dd>
                  </dl>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="算法">
              <ul class="tab-list clearfix">
                <li>
                  <dl
                    id="btnCentrality"
                    class="tab-li"
                    @click="centralityHandle"
                  >
                    <dt class="operate-icon operate-addBatch center"></dt>
                    <dd class="operate-desc">中心性</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnShortPath"
                    class="tab-li"
                    @click="shortPathHandle()"
                  >
                    <dt class="operate-icon operate-addBatch ZDLJ"></dt>
                    <dd class="operate-desc">最短路径</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="isAllShortPath"
                    class="tab-li"
                    @click="shortPathHandle('isAllShortPath')"
                  >
                    <dt class="operate-icon operate-addBatch road"></dt>
                    <dd class="operate-desc">全路径</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="协同工作">
              <ul class="tab-list clearfix">
                <li>
                  <dl id="btnImport" class="tab-li" @click="jsonImportHandle">
                    <dt class="operate-icon operate-addBatch importNode"></dt>
                    <dd class="operate-desc">导入(JSON)</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl id="btnExport" class="tab-li">
                    <dt class="operate-icon operate-addBatch exportNode"></dt>
                    <dd class="operate-desc">
                      <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                          导出<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="exportJson"
                            >JSON</el-dropdown-item
                          >
                          <!-- <el-dropdown-item command="exportExcel">EXCEL</el-dropdown-item> -->
                        </el-dropdown-menu>
                      </el-dropdown>
                    </dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnSaveRelationData"
                    class="tab-li"
                    @click="saveRelatonData"
                  >
                    <dt class="operate-icon operate-addBatch baocun"></dt>
                    <dd class="operate-desc">保存</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnShareRelationData"
                    class="tab-li"
                    @click="shareRelationData"
                  >
                    <dt class="operate-icon operate-addBatch gongxiang"></dt>
                    <dd class="operate-desc">共享</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnManagerRelationData"
                    class="tab-li"
                    @click="managerRelationData"
                  >
                    <dt class="operate-icon operate-addBatch guanli"></dt>
                    <dd class="operate-desc">管理</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </nav>
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
    <cache-data v-if="cacheDataVisible" ref="cacheData"></cache-data>
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
import { Node } from './js/entity/Node'
export default {
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
      let arr =
        this.contextNodeId != ''
          ? [this.contextNodeId]
          : this.network.getSelectedNodes()
      for (let i in arr) {
        let node = this.global.nodes.get(arr[i])
        node.taggingState()
      }
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
            let edgesList = data.result.edges
            if (edgesList.length !== 0) {
              for (var j = 0; j < edgesList.length; j++) {
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
      if (!selectNodes || selectNodes.length < 1) {
        this.$message({
          message: '请选中节点后再执行此操作',
          type: 'error',
          duration: 1500,
        })
        return false
      }
      this.focusNode(selectNodes)
      this.removeMenu()
    },
    overqjHandle(nodeId) {
      this.focusNode([nodeId])
      this.removeMenu()
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
  },
  created() {},
  mounted() {
    // 初始化画布
    /* eslint-disable no-new */
    new Workbench('mynetwork', this)
    // 绑定network事件
    this.bindEvent()
  },
}
</script>
<style lang="stylus" scoped>
>>>.el-dropdown
  display inline-block
  position relative
  color #fff
  font-size 14px
.mod-i2.i2-bg
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  overflow hidden
  &:before
    position fixed
    top 0
    left 0
    z-index -1
    width 100%
    height 100%
    content ''
    background url('~@/assets/img/i2bg.png') no-repeat center
    background-size cover
  .navbar-fixed-top
    position static !important
    z-index 10000
    width 100%
  .logo
    background url('~@/assets/img/i2logo.png') no-repeat
    height 40px
    width 85px
    outline 0 none
    float left !important
    margin 0 20px
    margin-top 3px
>>>.el-tabs__header
  background rgba(44, 239, 255, 0.5)
  margin-bottom 0
  .el-tabs__nav-wrap::after
    height 0
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
  padding-left 110px
  height 100%
ul.tab-list>li
  float left
  height 100%
  cursor pointer
  .tab-li
    float left
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
  background #1e9eae94
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
