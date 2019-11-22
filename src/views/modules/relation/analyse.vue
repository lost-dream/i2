<template>
  <div class="mod-relationAnalyse">
    <div id="netPanel">
      <div id="network_id" class="network"></div>
    </div>
    <div id="toolPanel" class="toolbox">
      <img class="toolbox-btn" src="@/assets/img/tool.png" alt="" />
      <div class="tool-box" id="tool_btn_box">
        <div class="tool-title">
          <span>工具箱</span>
        </div>
        <div>
          <ul class="tool-btn-container">
            <li>
              <a
                href="javascript:void(0);"
                id="btnAddSearch"
                class="tool-btn-add"
                @click="addSearchVisible = !addSearchVisible"
              >
                添加模型
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0);"
                id="btnDataFillter"
                class="tool-btn"
                @click="dataFillerHanlde"
                >数据筛选</a
              >
            </li>
            <li>
              <a
                @click="importHandle"
                href="javascript:void(0);"
                id="btnImport"
                class="tool-btn"
                >导&nbsp;&nbsp;&nbsp;&nbsp;入</a
              >
            </li>
            <li>
              <a
                @click="exportHandle"
                href="javascript:void(0);"
                id="btnExport"
                class="tool-btn"
                >导&nbsp;&nbsp;&nbsp;&nbsp;出</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="searchPanel" class="searchbox">
      <div>
        <a
          @click="$router.push({ name: 'relationSearch' })"
          id="btnReturnGxIndex"
          class="btn btn-blue"
          href="javascript:void(0);"
          ><i class="el-icon-back elicon"></i>返回</a
        >
        <a
          @click="clusteringHandle"
          id="btnClustering"
          class="btn btn-blue"
          href="javascript:void(0);"
          ><i class="el-icon-share elicon"></i>聚类切换</a
        >
        <a
          id="btnMaster"
          @click="masterHandle"
          class="btn btn-blue"
          href="javascript:void(0);"
          ><i class="el-icon-news elicon"></i>主要节点</a
        >
        <div class="radarContainer">
          <a
            @click="radarHandle"
            id="btnSearch"
            class="btn btn-blue"
            href="javascript:void(0);"
            ><i class="el-icon-news elicon"></i>查询</a
          >
          <div class="tc-div tc-shadow">
            <el-select
              v-model="txtSearch"
              size="200"
              filterable
              placeholder="请选择"
              @change="searchChangeHandle"
              v-if="cxVisble"
            >
              <el-option
                v-for="item in allNodeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
    <div
      id="contextMenu"
      class="contentMenu"
      style="z-index: 1000; display: none; position: absolute; width: 105px;"
    >
      <div class="menu_title">
        <span>操作</span>
      </div>
      <ul class="menu_list" v-if="contextNodeType == 'relationNode'">
        <li>
          <a
            href="javascript:void(0);"
            class="menu_item btn btn-blue"
            @click="addRelationHandle"
            >添加关系</a
          >
        </li>
        <li>
          <a
            href="javascript:void(0);"
            class="menu_item btn btn-blue"
            @click="deleteItem"
            >删除节点</a
          >
        </li>
      </ul>
      <ul class="menu_list" v-else-if="contextNodeType == 'node'">
        <li>
          <a
            href="javascript:void(0);"
            class="menu_item btn btn-blue"
            @click="analysisHandle"
            >关系挖掘</a
          >
        </li>
        <li>
          <a
            href="javascript:void(0);"
            class="menu_item btn btn-blue"
            @click="deleteItem"
            >删除关系</a
          >
        </li>
      </ul>
    </div>
    <fly-dialog
      class="custompos"
      width="400px"
      :modal="false"
      title="添加模型"
      :show.sync="addSearchVisible"
      @beforeCloseDialog="addSearchVisible = false"
    >
      <el-form class="dataForm" :inline="true" :model="dataForm" ref="dataForm">
        <el-form-item>
          <el-select v-model="dataForm.relationType" placeholder="模型选择">
            <el-option
              v-for="(item, index) of relationTypeList"
              :label="item.name"
              :value="item.type"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="dataForm.kws" placeholder="输入身份证"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchRelation">分析</el-button>
        </el-form-item>
      </el-form>
    </fly-dialog>
    <fly-dialog
      class="custompos"
      width="400px"
      :modal="false"
      title="数据筛选"
      :show.sync="fillterVisible"
      @beforeCloseDialog="fillterVisible = false"
    >
      <div id="sjsxForm">
        <el-form ref="SJSXform" :model="SJSXform" label-width="100px">
          <el-form-item
            v-for="(item, index) of dataFillterTypeList"
            :label="item.label"
            :key="index"
          >
            <el-switch
              v-model="SJSXform[item.type.slice(0, -2)].switch"
              @change="switchChange(item)"
            ></el-switch>
            <el-slider
              :max="10"
              @change="sliderChange(item)"
              v-model="SJSXform[item.type.slice(0, -2)].slider"
              class="myslider"
            ></el-slider>
            <span class="num">{{
              SJSXform[item.type.slice(0, -2)].slider
            }}</span>
          </el-form-item>
        </el-form>
      </div>
    </fly-dialog>
    <fly-dialog
      id="tjsx-dialog"
      width="400px"
      title="条件筛选"
      :show.sync="tjsxVisible"
      @beforeCloseDialog="tjsxVisible = false"
    >
      <div class="container">
        <header v-if="nodeType === 'SameTrain'">同旅馆次数</header>
        <header v-else>只写了旅馆标题，其他的还没区分</header>
        <el-form label-position="left" label-width="80px" :model="TJSXForm">
          <el-form-item label="证件号码">
            <el-input v-model="TJSXForm.IDNum"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="TJSXForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="旅馆名称" v-if="nodeType === 'SameHotel'">
            <el-input v-model="TJSXForm.hotelName"></el-input>
          </el-form-item>
          <el-form-item label="旅馆编号" v-if="nodeType === 'SameHotel'">
            <el-input v-model="TJSXForm.hotelID"></el-input>
          </el-form-item>
          <el-form-item label="旅馆地址" v-if="nodeType === 'SameHotel'">
            <el-input v-model="TJSXForm.httelAddr"></el-input>
          </el-form-item>
          <el-form-item label="入住时间" v-if="nodeType === 'SameHotel'">
            <el-input v-model="TJSXForm.checkIn"></el-input>
          </el-form-item>
          <el-form-item label="退房时间" v-if="nodeType === 'SameHotel'">
            <el-input v-model="TJSXForm.checkOut"></el-input>
          </el-form-item>
          <div class="submit-btn">
            <el-button @click.stop="filterItem">查询</el-button>
          </div>
        </el-form>
      </div>
    </fly-dialog>
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
    <!-- 弹窗, 协同工作保存 -->
    <details-info v-if="detailVisible" ref="detailInfo"></details-info>
    <!-- 弹窗，分析 关系挖掘 -->
    <analysis
      v-if="analysisVisible"
      @refreshAnalysis="queryData"
      ref="analysis"
      :originNodes="originNodes"
      :originEdges="originEdges"
    ></analysis>
  </div>
</template>

<script>
import FlyDialog from '@/components/fly-dialog'
import Vis from 'vis'
import FileSaver from 'file-saver'
import DetailsInfo from './DetailsInfo'
import Analysis from './AnalysisWindow'

export default {
  name: 'analyse',
  metaInfo: {
    title: '关系分析',
  },
  components: {
    FlyDialog,
    DetailsInfo,
    Analysis,
  },
  props: {},
  data() {
    return {
      searchNo: 1, // 查询的次数（每执行一次加一）
      addSearchVisible: false,
      fillterVisible: false,
      tjsxVisible: false,
      detailVisible: false,
      addRelationVisible: false,
      analysisVisible: false,
      cxVisble: false,
      isClustering: false,
      importVisible: false,
      allRemoveItems: '',
      nodes: [],
      edges: [],
      originNodes: null,
      originEdges: null,
      container: null,
      nodesArray: [],
      edgesArray: [],
      options: {},
      data: {},
      contextNsId: null, // 鼠标悬浮时，设置当前的id，离开时设置为null; 右键菜单使用
      contextNodeType: '',
      relationTypeList: [],
      xxNodecache: [], // 隐藏或者显示次要节点
      xxEdgecache: [],
      rmNodecache: [], // 开关缓存
      rmEdgecache: [],
      rmSlidercache: [],
      batNodes: [],
      batedges: [],
      relationNodesTempArray: [],
      dataForm: {
        kws: '',
        relationType: '',
      },
      nodeType: null,
      SJSXform: {
        SamePlane: {
          switch: true,
          slider: 0,
        },
        SameTrain: {
          switch: true,
          slider: 0,
        },
        SameHotel: {
          switch: true,
          slider: 0,
        },
        SameRoom: {
          switch: true,
          slider: 0,
        },
        SameCoach: {
          switch: true,
          slider: 0,
        },
        SameInternetCafe: {
          switch: true,
          slider: 0,
        },
        SameHousehold: {
          switch: true,
          slider: 0,
        },
        SameCase: {
          switch: true,
          slider: 0,
        },
        SamePrisonRoom: {
          switch: true,
          slider: 0,
        },
        HaveDrivingLicense: {
          switch: true,
          slider: 0,
        },
      },
      dataFillterTypeList: [],
      TJSXForm: {
        IDNum: null, // 身份证号
        userName: null, // 姓名
        hotelName: null, // 旅馆名称
        hotelID: null, // 旅馆编号
        httelAddr: null, // 旅馆地址
        checkIn: null, // 开始时间（旅馆 && 网吧)
        checkOut: null, // 结束时间（旅馆 && 网吧）
        roomNo: null, // 房间号
        computerNo: null, // 电脑号
        carNo: null, // 车牌号码
      },
    }
  },
  computed: {},
  methods: {
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
        let nodesList = jsonObj.nodes
        for (let i = 0; i < nodesList.length; i++) {
          if (_this.nodes.getIds().indexOf(nodesList[i].id) < 0) {
            _this.nodes.add(nodesList[i])
          }
        }
        for (var j = 0; j < edgesList.length; j++) {
          if (_this.edges.getIds().indexOf(edgesList[j].id) < 0) {
            _this.edges.add(edgesList[j])
          }
        }
      }
    },
    startfn() {
      // 初始化network
      this.init()
      // 查询分析数据
      this.queryData(this.$route.query)
    },
    queryData(data) {
      let params = {
        keyword: data.keyword,
        no: this.searchNo,
        relationType: !(data.relationType instanceof Array)
          ? [data.relationType]
          : data.relationType,
      }
      this.$api.aggregationAnalyse(params).then(({ data }) => {
        if (data && data.code === 200) {
          if (data.result.edges.length === 0) {
            this.$message({
              message: '没有相关模型！',
              type: 'error',
              duration: 1500,
            })
            return
          }
        } else {
          this.$message.error(data.message)
        }
        let resNodes = data.result.nodes
        let resEdges = data.result.edges
        this.originNodes = resNodes
        this.originEdges = resEdges
        var edgIds = this.edges.getIds()
        var ndsIds = this.nodes.getIds()
        let addNodeArr = []
        let addEdgeArr = []
        for (let i in resNodes) {
          if (ndsIds.indexOf(resNodes[i].id) === -1) {
            addNodeArr.push(resNodes[i])
          } else {
            resNodes[i].id = resNodes[i].id + '1'
            while (ndsIds.indexOf(resNodes[i].id) !== -1) {
              resNodes[i].id = resNodes[i].id + '1'
            }
            addNodeArr.push(resNodes[i])
          }
        }
        for (let j in resEdges) {
          if (edgIds.indexOf(resEdges[j].id) === -1) {
            if (
              ndsIds.indexOf(resEdges[j].to) === -1 &&
              ndsIds.indexOf(resEdges[j].from) === -1
            ) {
              addEdgeArr.push(resEdges[j])
            } else {
              if (ndsIds.indexOf(resEdges[j].to) !== -1) {
                resEdges[j].to = resEdges[j].to + '1'
                addEdgeArr.push(resEdges[j])
              } else {
                resEdges[j].from = resEdges[j].from + '1'
                addEdgeArr.push(resEdges[j])
              }
            }
            while (ndsIds.indexOf(resEdges[j].to) !== -1) {
              resEdges[j].to = resEdges[j].to + '1'
            }
            while (ndsIds.indexOf(resEdges[j].from) !== -1) {
              resEdges[j].from = resEdges[j].from + '1'
            }
          } else {
            while (edgIds.indexOf(resEdges[j].id) !== -1) {
              resEdges[j].id = resEdges[j].id + '1'
              resEdges[j].to = resEdges[j].to + '1'
              resEdges[j].from = resEdges[j].from + '1'
            }
            while (ndsIds.indexOf(resEdges[j].to) !== -1) {
              resEdges[j].to = resEdges[j].to + '1'
            }
            while (ndsIds.indexOf(resEdges[j].from) !== -1) {
              resEdges[j].from = resEdges[j].from + '1'
            }
            addEdgeArr.push(resEdges[j])
          }
        }

        for (let idx in addEdgeArr) {
          let ed = addEdgeArr[idx]
          if (edgIds.indexOf(ed.id) === -1) {
            this.edges.add(ed)
          } else {
            this.edges.update(ed)
          }
        }
        this.addNodeToCanvas(addNodeArr)
      })
    },
    addNodeToCanvas(childs) {
      var subnodes = []
      var updateNodes = []
      var ids = this.nodes.getIds()
      for (var idx in childs) {
        let node = childs[idx]
        if (ids.indexOf(node.id) === -1) {
          // 判断在聚合节点中是否已经存在
          subnodes.push(node)
        } else {
          var un = this.nodes.get(node.id)
          if (un) {
            updateNodes.push(un)
          }
        }
      }
      this.addOrUpdateNode(subnodes)
      this.nodes.update(updateNodes)
    },
    addOrUpdateNode(node, merge, physics) {
      let data = {
        add: [],
        update: [],
      }
      if (!(node instanceof Array)) {
        node = [node]
      }
      for (let i in node) {
        if (this.nodes.getIds().indexOf(node[i].id) === -1) {
          data.add.push(node[i])
        } else {
          if (merge === true) {
            var n = this.nodes.get(node[i].id)
            n.merge(node[i])
            data.update.push(node[n])
          } else {
            data.update.push(node[i])
          }
        }
      }
      if (data.add.length > 0) {
        this.nodes.add(data.add)
      }
      if (data.update.length > 0) {
        // 更新时是否保持现有位置不变，physics = true
        if (physics === true) {
          for (let i in data.update) {
            if (
              data.update[i].physics === undefined ||
              data.update[i].physics === true
            ) {
              data.update[i].x = undefined
              data.update[i].y = undefined
              data.update[i].physics = false
              data.update[i].hiddenPhysics = true
            }
          }
          this.nodes.update(data.update)
          for (let i in data.update) {
            if (data.update[i].hiddenPhysics === true) {
              data.update[i].physics = true
              data.update[i].hiddenPhysics = undefined
            }
          }
        }
        this.nodes.update(data.update)
      }
    },
    init() {
      let this_ = this
      this_.nodes = new Vis.DataSet(this_.nodesArray)
      this_.edges = new Vis.DataSet(this_.edgesArray)
      this_.container = document.getElementById('network_id')
      this_.data = {
        nodes: this_.nodes,
        edges: this_.edges,
      }
      this_.options = {
        nodes: {
          borderWidth: 0,
          size: 18,
          color: {
            // border: '#406897',
            background: 'rgba(0,0,0,0)',
            hover: {
              // border: '#2B7CE9',
              background: '#adc',
            },
            // highlight: {
            //   border: 'black',
            //   background: 'blue',
            // },
          },
          font: { color: '#ffffff' },
          shapeProperties: { useBorderWithImage: true },
        },
        edges: {
          arrows: {
            to: { enabled: true, scaleFactor: 0.5, type: 'arrow' },
            middle: { enabled: false, scaleFactor: 1, type: 'arrow' },
            from: { enabled: false, scaleFactor: 1, type: 'arrow' },
          },
          arrowStrikethrough: false,
          font: {
            color: '#ffffff',
            strokeWidth: 0,
          },
          smooth: {
            type: 'continuous',
          },
        },
        groups: {
          useDefaultGroups: true,
        },
        interaction: {
          hover: true,
          navigationButtons: false,
          multiselect: true,
        },
        manipulation: {
          enabled: false,
        },
        layout: {},
        physics: {
          maxVelocity: 10, // 最大速度
          solver: 'barnesHut',
          barnesHut: {
            avoidOverlap: 0, // 避免重叠	【0-1】
            centralGravity: 0.3, // 中心引力
            damping: 0.09, // 阻尼	【0-1】
            gravitationalConstant: -2000, // 排斥力 越小效果越强
            springConstant: 0.04, // 弹簧强度
            springLength: 80, // 弹簧长度
          },
          timestep: 0.5,
          stabilization: {
            enabled: true,
            fit: true,
            iterations: 1000,
            onlyDynamicEdges: false,
            updateInterval: 50,
          },
        },
      }
      this_.network = new Vis.Network(
        this_.container,
        this_.data,
        this_.options,
      )
      this.bindNetwork()
    },
    // 重置画布
    resetNetwork() {
      var ns = []
      var gs = []

      this.nodes = new Vis.DataSet(ns)
      this.edges = new Vis.DataSet(gs)
      this.data = {
        nodes: this.nodes,
        edges: this.edges,
      }
      // 销毁之前的实例
      if (this.network) this.network.destroy()
      this.network = new Vis.Network(this.container, this.data, this.options)
      this.bindNetwork()
    },
    bindNetwork() {
      // 双击事件
      this.network.on('doubleClick', this.doubleClick)
      // 单击事件
      this.network.on('click', this.clickEvent)
      this.network.on('hoverNode', this.hoverEvent)
      this.network.on('blurNode', this.blurEvent)
      this.network.on('dragStart', this.dragStartEvent)
      this.network.on('dragEnd', this.dragEndEvent)
      // 右键菜单
      this.network.on('oncontext', this.oncontextEvent)
    },
    /**
     * 双击事件
     */
    doubleClick(params) {
      if (params.nodes.length === 0) return false
      var curNode = this.nodes.get(params.nodes[0])
      // 双击类型节点，进行条件筛选
      if (curNode.nodeType.substring(curNode.nodeType.length - 2) === 'RN') {
        // this.tjsxVisible = true
        this.nodeType = curNode.nodeType.substring(
          0,
          curNode.nodeType.length - 2,
        )
        console.log(`this.nodeType=====${this.nodeType}`)
      }
    },
    /**
     * 单击事件
     */
    clickEvent(params) {
      this.removeContextMenu()
      if (params.nodes.length === 1) {
        // 点击的是节点
        // let node = this.nodes.get(params.nodes[0])
      } else if (params.edges.length === 1) {
        // 点击的是连线，显示详情
        var edge = this.edges.get(params.edges[0])
        // var cnode = this.nodes.get(edge.to)
        if (edge.relationType === 'RelationEdge') {
        } else {
          this.detailVisible = true
          this.getDetails(edge)
        }
      }
    },
    /**
     * hover,blur 事件
     */
    hoverEvent(params) {
      this.contextNsId = params.node
    },
    blurEvent(params) {
      this.contextNsId = null
    },
    /**
     * 拖拽时，将节点的弹簧关闭
     * @param params
     */
    dragStartEvent(params) {
      if (params.nodes && params.nodes.length > 0) {
        var curNode = this.nodes.get(params.nodes[0])
        curNode.x = undefined
        curNode.y = undefined
        curNode.physics = false
        this.nodes.update(curNode)
      }
    },
    dragEndEvent(params) {
      if (params.nodes && params.nodes.length > 0) {
        var curNode = this.nodes.get(params.nodes[0])
        var pos = this.network.getPositions([curNode.id])
        curNode.x = pos[curNode.id].x
        curNode.y = pos[curNode.id].y
        this.nodes.update(curNode)
      }
    },
    /** 右键菜单**/
    oncontextEvent(params) {
      params.event.returnValue = false // 取消系统菜单显示
      this.removeContextMenu()
      if (this.contextNsId == null) return false
      // 显示右键菜单
      this.showContextMenu(this.contextNsId, params)
    },
    // 显示右键菜单
    showContextMenu(contextNodeId, params) {
      let nodeId = contextNodeId
      let curNode = this.nodes.get(nodeId)
      this.showMenu(params)
      if (curNode.nodeType.substring(curNode.nodeType.length - 2) === 'RN') {
        this.contextNodeType = 'relationNode'
      } else {
        this.contextNodeType = 'node'
      }
    },
    showMenu(params) {
      $('#contextMenu').css({ left: params.event.clientX })
      $('#contextMenu').css({ top: params.event.clientY })
      $('#contextMenu').css({ display: 'block' })
    },
    // 移除右键菜单
    removeContextMenu() {
      $('#contextMenu').css({ display: 'none' })
    },
    // 点击连线获取详情
    getDetails(ed) {
      let queryObj = {
        idsJson: ed.idArr,
        relationType: ed.relationType,
      }
      this.$api.compareAnalyse(queryObj).then(({ data }) => {
        if (data && data.code === 200) {
          this.$nextTick(() => {
            this.$refs.detailInfo.init(data.result, ed.relationType)
          })
        }
      })
    },
    // 导入
    importHandle() {
      this.importVisible = true
    },
    // 导出
    exportHandle() {
      if (!this.hasData()) {
        this.$message({
          message: '没有可以导出的数据！',
          type: 'error',
          duration: 1500,
        })
        return false
      }
      this.exportJson()
    },
    // 数据筛选
    dataFillerHanlde() {
      this.fillterVisible = !this.fillterVisible
      let canvasNode = this.getAllNodes()
      let ns = this.getAllNodes()
      let egs = this.getAllEdges()
      this.batedges = egs
      this.batNodes = ns
      let typeNode = canvasNode.filter(item => {
        if (item.nodeType.substring(item.nodeType.length - 2) === 'RN')
          return item
      })
      let tpNode = typeNode.map(item => {
        return item.nodeType
      })
      for (let i in tpNode) {
        if (!this.disRepeat(this.dataFillterTypeList, tpNode[i])) {
          this.dataFillterTypeList.push({
            type: tpNode[i],
            label: this.initLabel(tpNode[i]),
          })
        }
      }
      console.log(this.dataFillterTypeList)
    },

    // 开关隐藏节点
    switchChange(item) {
      if (!this.SJSXform[item.type.slice(0, -2)].switch) {
        // 隐藏该类型的节点
        this.hiddenNode(item.type)
      } else {
        for (let i in this.rmNodecache) {
          if (this.rmNodecache[i].type === item.type) {
            this.addNode(this.rmNodecache[i].node)
            this.rmNodecache[i] = { node: '', type: '' }
          }
        }
      }
    },
    // slider 筛选
    sliderChange(item) {
      // let num = this.SJSXform[item.type.slice(0, -2)].slider
      let rmn = []
      for (let key in this.SJSXform) {
        let a = this.hiddenNodeByNum(key + 'RN', this.SJSXform[key].slider)
        rmn = rmn.concat(a)
      }
      // 隐藏不满足条的节点
      this.removeNode(rmn)
    },
    hiddenNodeByNum(type, num) {
      let tpnds = this.batNodes.filter(item => {
        if (item.nodeType == type) {
          return item
        }
      })
      let rmNode = []
      for (let i in tpnds) {
        let cids = this.findChildsBytpIdAndNum(tpnds[i].id, num)
        for (let j in cids) {
          rmNode.push(cids[j])
        }
      }
      return rmNode
    },
    removeNode(rmNode) {
      let addnode = []
      var ids1 = this.batNodes.map(item => {
        return item.id
      })
      for (let i in ids1) {
        if (this.existsId(rmNode, ids1[i])) continue
        addnode.push(ids1[i])
      }
      let an = []
      for (let i in addnode) {
        for (let j in this.batNodes) {
          if (addnode[i] == parseInt(this.batNodes[j].id)) {
            an.push(this.batNodes[j])
          }
        }
      }
      this.resetNetwork()
      this.nodes.add(an)
      this.edges.add(this.batedges)
    },
    hiddenNode(type) {
      let ns = this.getAllNodes()
      let tpnds = ns.filter(item => {
        if (item.nodeType == type) {
          return item
        }
      })
      let rmNode = []
      for (let i in tpnds) {
        let cids = this.findChildsBytpId(tpnds[i].id)
        rmNode.push(tpnds[i].id)
        for (let j in cids) {
          rmNode.push(cids[j])
        }
      }
      let arr = []
      for (let i in rmNode) {
        arr.push(this.nodes.get(rmNode[i]))
        this.nodes.remove(rmNode[i])
      }
      this.rmNodecache.push({ node: arr, type: type })
    },
    findChildsBytpIdAndNum(id, num) {
      let edges = this.batedges
      let ids = []
      for (let i in edges) {
        if (edges[i].to === id && parseInt(edges[i].label) <= parseInt(num)) {
          ids.push(edges[i].from)
        }
      }
      if (this.findChildsBytpId(id).length == ids.length) {
        ids.push(id)
      }
      return ids
    },
    findChildsBytpId(id) {
      let edges = this.getAllEdges()
      let ids = []
      for (let i in edges) {
        if (edges[i].to === id) {
          ids.push(edges[i].from)
        }
      }
      return ids
    },
    disRepeat(arr, a) {
      let b = false
      arr.map(item => {
        if (item.type === a) {
          b = true
        }
      })
      return b
    },
    initLabel(type) {
      type = type.slice(0, -2)
      let label = ''
      switch (type) {
        case 'SameHotel':
          label = '同旅馆'
          break
        case 'SameRoom':
          label = '同房间'
          break
        case 'SamePlane':
          label = '同飞机'
          break
        case 'SameTrain':
          label = '同火车'
          break
        case 'SameCoach':
          label = '同汽车'
          break
        case 'SameInternetCafe':
          label = '同网吧'
          break
        case 'SameHousehold':
          label = '同户'
          break
        case 'SameCase':
          label = '同案'
          break
        case 'SamePrisonRoom':
          label = '同监室'
          break
        case 'HaveCar':
          label = '拥有车'
          break
        case 'HaveDrivingLicense':
          label = '驾照'
          break
      }
      return label
    },
    // 数据筛选-- 开关
    handleChange: val => {
      console.log(val)
    },
    convertArray(data) {
      console.log(data)
      let ns = data.nodes.filter(item => {
        return item.keyword !== '342128196203036214'
      })
      let newNs = this.buildRelationNode('同火车')
      let ids = data.nodes.map(item => {
        return item.id
      })
      let edgs = this.buildsEdgs(ids, newNs)
      console.log(ns)
      return {
        nodes: data.nodes.concat(newNs),
        edges: edgs,
      }
    },
    buildsEdgs(ids, newNs) {
      let edgErr = []
      for (let i in ids) {
        let obj = {
          id: i,
          to: newNs[0].id,
          from: ids[i],
        }
        edgErr.push(obj)
      }
      return edgErr
    },
    buildRelationNode(relation) {
      return [
        {
          id: 2,
          label: relation,
          nodeType: 'Relation',
        },
      ]
    },
    // 添加模型
    searchRelation() {
      this.searchNo++
      let query = {
        keyword: this.dataForm.kws,
        no: this.searchNo,
        relationType: [this.dataForm.relationType],
      }
      this.queryData(query)
    },
    // 添加关系
    addRelationHandle() {
      this.addRelationVisible = true
      this.removeContextMenu()
    },
    // 关系挖掘
    analysisHandle() {
      this.analysisVisible = true
      let curNode = this.getCurrentNode()
      this.removeContextMenu()
      this.$nextTick(() => {
        this.$refs.analysis.init(curNode, this.nodes, this.edges)
      })
    },
    // 获取当前节点
    getCurrentNode() {
      return this.nodes.get(this.contextNsId)
    },
    // 聚类切换
    clusteringHandle() {
      if (!this.hasData()) {
        this.$message({
          message: '没有关系数据！',
          type: 'error',
          duration: 1500,
        })
        return false
      }
      this.isClustering = !this.isClustering
      if (this.isClustering) {
        // 转换为聚类模式
        this.countNodeFun()
      } else {
        this.disCountNodeFun()
      }
    },
    // 主要节点
    masterHandle() {
      if (!this.hasData()) {
        this.$message({
          message: '没有关系数据！',
          type: 'error',
          duration: 1500,
        })
        return false
      }
      if (this.xxNodecache && this.xxNodecache.length > 0) {
        this.discoverNode()
      } else {
        this.coverNode()
      }
    },
    /**
     * 隐藏次要节点
     */
    coverNode() {
      let selectNodes = this.network.getSelectedNodes()
      if (!selectNodes || selectNodes.length < 2) {
        this.$message({
          message: '请使用Ctrl+鼠标左键选择多个节点后再执行此操作!',
          type: 'error',
          duration: 1500,
        })
        return false
      }
      var results = this.getRelationPaths(selectNodes)
      if (results.length === 0) {
        this.$message({
          message: '没有找到相连路径!',
          type: 'error',
          duration: 1500,
        })
        return false
      }
      var allNodes = []
      var allEdges = []
      for (var i in results) {
        for (var j in results[i]) {
          var relation = results[i][j]

          for (var k in relation.nodes) {
            var n = relation.nodes[k]
            if (this.existsId(allNodes, n)) continue

            allNodes.push(n)
          }

          for (let k in relation.edges) {
            var l = relation.edges[k]
            if (this.existsId(allEdges, l)) continue

            allEdges.push(l)
          }
        }
      }
      var ids1 = this.nodes.getIds()
      for (let i in ids1) {
        if (this.existsId(allNodes, ids1[i])) continue

        this.xxNodecache.push(this.nodes.get(ids1[i]))
        this.nodes.remove(ids1[i])
      }

      var ids2 = this.edges.getIds()
      for (let i in ids2) {
        if (this.existsId(allEdges, ids2[i])) continue

        this.xxEdgecache.push(this.edges.get(ids2[i]))
        this.edges.remove(ids2[i])
      }

      return true
    },
    /**
     * 显示次要节点
     */
    discoverNode() {
      this.addNode(this.xxNodecache)
      this.addEdge(this.xxEdgecache)
      this.xxNodecache = []
      this.xxEdgecache = []
    },
    addNode(node) {
      console.log(node)
      var data = {
        add: [],
        update: [],
      }

      if (!(node instanceof Array)) {
        node = [node]
      }

      for (var i in node) {
        if (this.nodes.getIds().indexOf(node[i].id) === -1)
          data.add.push(node[i])
        else {
          var n = this.nodes.get(node[i].id)
          data.update.push(n)
        }
      }

      if (data.add.length > 0) this.nodes.add(data.add)
      if (data.update.length > 0) this.nodes.update(data.update)
    },
    addEdge(edge) {
      var data = {
        add: [],
        update: [],
      }

      if (!(edge instanceof Array)) {
        edge = [edge]
      }

      for (var i in edge) {
        var ed = edge[i]

        if (!this.getEdgeConnecting(ed.from, ed.to)) data.add.push(ed)
        else {
          var e = this.edges.get({
            filter: function(edge) {
              return edge.from == ed.from && edge.to == ed.to
            },
          })[0]
          e.merge(ed)
          e.updateLabel()
          e.updateWidth()
          data.update.push(ed)
        }
      }

      if (data.add.length > 0) this.edges.add(data.add)
      if (data.update.length > 0) this.edges.update(data.update)
    },
    // 获取关系路径
    getRelationPaths(selectNodes) {
      var results = []
      for (let i = 0; i < selectNodes.length; i++) {
        for (let j = i + 1; j < selectNodes.length; j++) {
          let rs = this.getRelationNodes(selectNodes[i], selectNodes[j])
          this.relationNodesTempArray = [] // 清空临时变量
          if (rs.length === 0) return results

          results.push(rs)
        }
      }

      return results
    },
    // 获取关系节点
    getRelationNodes(n1, n2, path) {
      if (!path) {
        path = ','
      }
      path += n1 + ','

      var nodePaths = []
      var cedges = this.network.getConnectedEdges(n1)
      if (!cedges || cedges.length === 0) return nodePaths

      for (var i in cedges) {
        var node
        var edge = this.edges.get(cedges[i])
        if (edge.from === n1) {
          node = edge.to
        } else {
          node = edge.from
        }

        if (path.indexOf(',' + node + ',') !== -1)
          // 防止死循环
          continue

        // 该路径抵达目标
        if (node === n2) {
          var _nodes = (path + n2).split(',')
          var exists = true // 如果已经存在则不在添加，以免冗余数据增加计算量
          for (var j in _nodes) {
            if (!this.existsId(this.relationNodesTempArray, _nodes[j])) {
              this.relationNodesTempArray.push(_nodes[j])
              exists = false
            }
          }

          if (!exists) {
            var relation = {
              nodes: _nodes,
              edges: this.getTraceBackEdges(_nodes),
            }
            nodePaths.push(relation)
          }
        } else {
          // 如果没抵达目标，则递归子节点
          var newPath = path
          var results = this.getRelationNodes(node, n2, newPath)
          for (let i in results) {
            nodePaths.push(results[i])
          }
        }
      }

      return nodePaths
    },
    // 回到起始节点的边
    getTraceBackEdges(tbnodes) {
      tbnodes.reverse()
      var path = []
      for (var i = 0; i < tbnodes.length - 1; i++) {
        // 不迭代最后一个节点
        var l = this.getEdgeConnecting(tbnodes[i], tbnodes[i + 1])
        if (l) {
          path.push(l)
        } else {
          path.push(this.getEdgeConnecting(tbnodes[i + 1], tbnodes[i]))
        }
      }
      return path
    },
    // 获取连接两节点的边
    getEdgeConnecting(a, b) {
      // let edge = this.getAllEdges().filter(item => {
      //   return item.from === a && item.to === b
      // })[0]
      let edge = this.getAllEdges().filter(item => {
        if (item.from == a && item.to == b) {
          return item
        }
      })[0]
      console.log(edge)
      if (edge instanceof Object) {
        return edge.id
      }
    },
    // 判断数组中是否存在id
    existsId(arr, id) {
      var b = false
      for (var a in arr) {
        if (parseInt(arr[a]) === id) {
          b = true
        }
      }
      return b
    },
    // 非聚类模式
    disCountNodeFun() {
      // 重置画布
      this.resetNetwork()
      let nodes = JSON.parse(sessionStorage.getItem('nodes') || '[]')
      let edges = JSON.parse(sessionStorage.getItem('edges') || '[]')
      this.nodes.add(nodes)
      this.edges.add(edges)
    },
    // 聚类模式
    countNodeFun() {
      sessionStorage.setItem('nodes', JSON.stringify(this.getAllNodes()))
      sessionStorage.setItem('edges', JSON.stringify(this.getAllEdges()))
      // 找出画布上所有的关系类型节点
      let relNodes = this.findRelationNodes()
      if (!relNodes || relNodes.length === 0) {
        return
      }
      console.log(relNodes)
      let nodes = []
      let edges = []
      let allEdges = this.getAllEdges()
      for (let i in relNodes) {
        let cedges = allEdges.filter(item => {
          return relNodes[i].id === item.to
        })
        let pedge = allEdges.filter(item => {
          return relNodes[i].id === item.from
        })
        let n = this.buildNodes(pedge, cedges)
        let eg = this.buildEdges(pedge, cedges)
        nodes = nodes.concat(n)
        edges = edges.concat(eg)
        console.log(n)
        console.log(eg)
      }
      console.log(nodes)
      console.log(edges)
      let nids = nodes.map((item, index) => {
        return item.id
      })
      nids = nids.filter((item, index) => {
        return nids.indexOf(item) == index
      })
      nodes = nids.map(item => {
        return this.nodes.get(item)
      })
      console.log(nids)
      // 重置画布
      this.resetNetwork()
      this.rendNode(nodes, edges)
    },
    rendNode(nodes, edges) {
      this.nodes.add(nodes)
      this.edges.add(edges)
    },
    buildNodes(pedge, cedges) {
      let pnode = [this.nodes.get(pedge[0].to)]
      let cnode = cedges.map(item => {
        return this.nodes.get(item.from)
      })
      return pnode.concat(cnode)
    },
    buildEdges(pedge, cedges) {
      let pid = pedge[0].to
      let label = pedge[0].label
      let eg = cedges.map(item => {
        item.to = pid
        item.label = label + '(' + item.label + ')'
        return item
      })
      return eg
    },
    findRelationNodes() {
      let relaIds = this.getAllNodes().filter(item => {
        if (item.nodeType.substring(item.nodeType.length - 2) === 'RN') {
          return item
        }
      })
      return relaIds
    },
    findChilds() {},
    // 查询
    radarHandle() {
      this.cxVisble = !this.cxVisble
      this.buildeRadarItem()
    },
    buildeRadarItem() {
      let nds = this.getAllNodes()
      // let key = this.txtSearch
      let arr = []
      for (let i in nds) {
        var node = nds[i]
        if (node.nodeType.substring(node.nodeType.length - 2) === 'RN') {
          continue
        }
        arr.push({
          value: node.id,
          label: node.label,
        })
      }
      this.allNodeOption = arr
    },
    searchChangeHandle(val) {
      console.log(val)
      this.focusNode(val)
    },
    // 获取页面上所有节点数据
    getAllNodes() {
      let datas = []
      if (this.nodes) {
        let ids = this.nodes.getIds()
        for (let i in ids) {
          datas.push(this.nodes.get(ids[i]))
        }
      }
      return datas
    },
    getAllEdges() {
      let datas = []
      if (this.edges) {
        let ids = this.edges.getIds()
        for (let i in ids) {
          datas.push(this.edges.get(ids[i]))
        }
      }
      return datas
    },
    // 删除关系
    deleteItem() {
      let curNode = this.getCurrentNode()
      this.removeContextMenu()
      this.nodes.remove(curNode.id)
    },
    /**
     * 定位到某个节点
     */
    focusNode(nodeId) {
      var options = {
        scale: 1.5,
        offset: { x: 0, y: 0 },
        animation: {
          duration: 1000,
          easingFunction: 'easeInOutQuad',
        },
      }
      this.network.focus(nodeId, options)
      this.network.selectNodes([nodeId], false)
    },
    /**
     * 判断画布中是否有数据
     */
    hasData() {
      if (this.nodes && this.nodes.length > 0) return true
      else return false
    },
    filterItem() {
      console.log(this.TJSXForm)
    },
    exportJson() {
      var datas = this.buildExportData()
      let blob = new Blob([JSON.stringify(datas)])
      FileSaver.saveAs(blob, 'relation.json')
    },
    buildExportData() {
      var results = []
      var ids = this.nodes.getIds()
      for (var i in ids) {
        var root = this.nodes.get(ids[i])
        results.push(root)
      }
      var edIds = this.edges.getIds()
      var edgs = []
      for (let i in edIds) {
        var edg = this.edges.get(edIds[i])
        edgs.push(edg)
      }
      return { nodes: results, edges: edgs }
    },
  },
  created() {
    this.$api.getAllRelationType().then(({ data }) => {
      if (data && data.code === 200) {
        this.relationTypeList = data.result.map(item => {
          return {
            type: item.type,
            name: item.name,
          }
        })
      }
    })
  },
  mounted() {
    this.startfn()
  },
}
</script>
<style lang="stylus" scoped>
>>>.el-select .el-input
  width auto
  color #fff
>>>.custompos .el-dialog
  position absolute
  top 194px
  left 320px
  .el-form-item
    display: block
    margin 0 0 20px
    &:nth-last-child(1)
      margin 0
>>>.el-input__inner
  color: #fff
  background: transparent
.dataForm
  padding 10px
.btn
  cursor pointer
  vertical-align middle
  margin 0
  position relative
  display inline-block
  color #fff
  box-shadow 0 1px 0 rgba(0, 0, 0, 0.05)
  transition all 0.15s ease
  border-radius 2px
  background-clip padding-box
  padding 6px 12px
  margin-bottom 0
  font-size 14px
  font-weight normal
  line-height 1.42857143
  text-align center
  white-space nowrap
  touch-action manipulation
  user-select none
  background-image none
  border 1px solid transparent
  margin-right 5px
.btn, .btn:focus
  color #fff
  background-color transparent
  border-color #4d97c6
  background-image none
  font-size 14px
.btn-blue, .btn-blue:focus, .m-pagination-page li
  background-color #022336 !important
  border 1px solid #07507a
  outline none
.btn .elicon
  margin-right 4px
  font-size 14px
  vertical-align middle
#network_id
  width 100%
  height 735px
#toolPanel
  position absolute
  left 10px
  top 80px
  display block
.toolbox
  background-color rgba(18, 85, 120, 0.5) !important
  border 1px solid #07507a !important
  .toolbox-btn
    cursor pointer
  #tool_btn_box
    position absolute
    left 0px
    top 40px
    display block
    width 105px
    background-color rgba(18, 85, 120, 0.5) !important
    border 1px solid #07507a !important
    .tool-title
      color #fff
      text-align center
      font-size 18px
      border-bottom 1px solid #07507a
    .tool-btn-container
      margin-top 5px
      margin-bottom 10px
      list-style none
      li
        padding-left 10px
        padding-right 10px
        padding-top 5px
  .tool-box a
    color #fff
    text-decoration none
    display block
    white-space nowrap
    text-align center
    padding 7px 0
  .tool-btn-add
    background-color #ac6a00
    border 1px solid #ac6a00
    padding 3px
  .tool-btn
    background-color #0075a9
    border 1px solid #07507a
    padding 3px
#searchPanel
  position absolute
  right 10px
  top 80px
  display block
#contextMenu
  background-color rgba(18, 85, 120, 0.5) !important
  border-radius 2px
  .menu_title
    color #fff
    text-align center
    font-size 18px
    border-bottom 1px solid #07507a
  .menu_list
    margin-top 5px
    margin-bottom 10px
    list-style none
  .menu_list li
    padding-left 10px
    padding-right 10px
    padding-top 5px
  .menu_item
    color #fff
    text-decoration none
    display block
    white-space nowrap
    text-align center
    padding 7px 0
    margin-right 0
.mode-layout
  padding 10px
.radarContainer
  display inline-block
.tc-div
  position absolute
  top 42px
  right 0px
#tjsx-dialog
  .container
    padding 10px
    background rgba(44, 239, 255, 0.3)
    header
      color #fff
  >>>.el-form-item
    margin 0
    padding 10px 0
  .submit-btn
    text-align center
#sjsxForm
  >>>.el-form-item
    margin-bottom 0px
  .num
    color #fff
.myslider
  width 110px
  display inline-flex
  margin-left 34px
  align-items center
  height 20px
  line-height 20px
  vertical-align middle
  margin-right 10px
.importNode
  padding 10px
  .el-upload__tip
    color #fff
>>>.el-upload-list__item-name
  color #fff
  &:hover
    color #17b3a3
</style>
