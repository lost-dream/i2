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
                >添加模型</a
              >
            </li>
            <li>
              <a
                href="javascript:void(0);"
                id="btnDataFillter"
                class="tool-btn"
                @click="fillterVisible = !fillterVisible"
                >数据筛选</a
              >
            </li>
            <li>
              <a href="javascript:void(0);" id="btnImport" class="tool-btn"
                >导&nbsp;&nbsp;&nbsp;&nbsp;入</a
              >
            </li>
            <li>
              <a href="javascript:void(0);" id="btnExport" class="tool-btn"
                >导&nbsp;&nbsp;&nbsp;&nbsp;出</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="searchPanel" class="searchbox">
      <div>
        <a id="btnReturnGxIndex" class="btn btn-blue" href="javascript:void(0);"
          ><i class="el-icon-back elicon"></i>返回</a
        >
        <a id="btnClustering" class="btn btn-blue" href="javascript:void(0);"
          ><i class="el-icon-share elicon"></i>聚类切换</a
        >
        <a id="btnMaster" class="btn btn-blue" href="javascript:void(0);"
          ><i class="el-icon-news elicon"></i>主要节点</a
        >
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
      <ul class="menu_list">
        <li>
          <a
            href="javascript:void(0);"
            class="menu_item btn btn-blue"
            @click="fillterVisible = !fillterVisible"
            >关系挖掘</a
          >
        </li>
        <li>
          <a
            href="javascript:void(0);"
            class="menu_item btn btn-blue"
            @click="fillterVisible = !fillterVisible"
            >删除节点</a
          >
        </li>
        <li>
          <a
            href="javascript:void(0);"
            class="menu_item btn btn-blue"
            @click="fillterVisible = !fillterVisible"
            >删除节点</a
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
          <el-button @click="searchRelation()">分析</el-button>
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
    ></fly-dialog>
    <fly-dialog
      width="400px"
      title="条件筛选"
      :show.sync="tjsxVisible"
      @beforeCloseDialog="tjsxVisible = false"
    ></fly-dialog>
    <!-- 弹窗, 协同工作保存 -->
    <details-info v-if="detailVisible" ref="detailInfo"></details-info>
  </div>
</template>

<script>
import FlyDialog from '@/components/fly-dialog'
import Vis from 'vis'
import DetailsInfo from './DetailsInfo'
export default {
  components: {
    FlyDialog,
    DetailsInfo,
  },
  props: {},
  data() {
    return {
      addSearchVisible: false,
      fillterVisible: false,
      tjsxVisible: false,
      detailVisible: false,
      nodes: [],
      edges: [],
      container: null,
      nodesArray: [],
      edgesArray: [],
      options: {},
      data: {},
      contextNsId: null, // 鼠标悬浮时，设置当前的id，离开时设置为null; 右键菜单使用
      relationTypeList: [],
      dataForm: {
        kws: '',
        relationType: '',
      },
    }
  },
  computed: {},
  methods: {
    startfn() {
      // 初始化network
      this.init()
      // 查询分析数据
      this.queryData(this.$route.query)
    },
    queryData(data) {
      this.$api.aggregationAnalyse(data).then(({ data }) => {
        var edgIds = this.edges.getIds()
        let resEdges = data.result.edges
        for (let idx in resEdges) {
          let ed = resEdges[idx]
          if (edgIds.indexOf(ed.id) === -1) {
            this.edges.add(ed)
          } else {
            this.edges.update(ed)
          }
        }
        this.addNodeToCanvas(data.result.nodes)
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
          shape: 'dot',
          size: 18,
          font: { color: '#ffffff' },
          borderWidth: 2,
        },
        edges: {
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
        this.tjsxVisible = true
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
      // let nodeId = contextNodeId
      // let curNode = this.nodes.get(nodeId)
      this.showMenu(params)
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
      let query = {
        keyword: this.dataForm.kws,
        relationType: this.dataForm.relationType,
      }
      this.queryData(query)
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
>>>.custompos .el-dialog
  position absolute
  top 194px
  left 320px
.dataForm
  padding 10px
.btn
  cursor pointer
  vertical-align middle
  margin 0
  position relative
  display inline-block
  color #fff
  -webkit-box-shadow 0 1px 0 rgba(0, 0, 0, 0.05)
  -moz-box-shadow 0 1px 0 rgba(0, 0, 0, 0.05)
  box-shadow 0 1px 0 rgba(0, 0, 0, 0.05)
  -webkit-transition all 0.15s ease
  -moz-transition all 0.15s ease
  -o-transition all 0.15s ease
  transition all 0.15s ease
  -webkit-border-radius 2px
  -webkit-background-clip padding-box
  -moz-border-radius 2px
  -moz-background-clip padding
  border-radius 2px
  background-clip padding-box
  padding 6px 12px
  margin-bottom 0
  font-size 14px
  font-weight normal
  line-height 1.42857143
  text-align center
  white-space nowrap
  -ms-touch-action manipulation
  touch-action manipulation
  -webkit-user-select none
  -moz-user-select none
  -ms-user-select none
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
</style>
