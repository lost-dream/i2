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
                    <dt class="operate-icon operate-addBatch"></dt>
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
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">导入节点</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnCacheData"
                    class="tab-li"
                    @click="cacheDataHandle"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">数据缓存器</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnAddEdge"
                    class="tab-li"
                    @click="addEdgeHandle"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">添加关系</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">数据缓存</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">锁定</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">解锁</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">选择</dd>
                  </dl>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="编辑">
              <ul class="tab-list clearfix">
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">编辑</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">删除</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">一键标注</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">备注</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
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
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">显示</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="布局">
              <ul class="tab-list clearfix">
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">自动</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">矩形</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
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
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">关系挖掘</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">两两分析</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">全局分析</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">亲密度分析</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">定向分析</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">档案</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">轨迹</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">案件串并</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">碰撞对比分析</dd>
                  </dl>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="算法">
              <ul class="tab-list clearfix">
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">中心性</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">六度空间</dd>
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
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">导入(JSON)</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">导出</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">保存</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
                    <dd class="operate-desc">共享</dd>
                  </dl>
                  <div class="or-spacer-vertical">
                    <div class="mask"></div>
                  </div>
                </li>
                <li>
                  <dl
                    id="btnBatchAddNode"
                    class="tab-li"
                  >
                    <dt class="operate-icon operate-addBatch"></dt>
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
        <sidefun
          :detail='basicInfo'
          ref="sidebarControl"
        ></sidefun>
      </sidebar>
    </div>
    <div
      id="mainpanel"
      class="mainpanel"
    >
      <div id="mynetwork"></div>
    </div>
    <!-- 弹窗, 新增节点 -->
    <add-nodes
      v-if="addNodesVisible"
      ref="addNodes"
    >
    </add-nodes>
    <!-- 弹窗，数据缓存器 -->
    <cache-data
      v-if="cacheDataVisible"
      ref="cacheData"
    ></cache-data>
  </div>
</template>

<script>
import Sidebar from '@/views/common/Sidebar'
import SidemenuItem from '@/views/common/SidemenuItem'
import Sidefun from './Sidefun'
import AddNodes from './AddNodes'
import CacheData from './CacheData'
import { Workbench } from './js/workbench'
import { expandNode } from './js/expandNode'

export default {
  components: {
    Sidebar,
    SidemenuItem,
    Sidefun,
    AddNodes,
    CacheData
  },
  data () {
    return {
      addNodesVisible: false,
      cacheDataVisible: false,
      basicInfo: {
        idNumber: '',
        name: '',
        nation: '',
        sex: '',
        birthday: '',
        cellphone: '',
        currentAddress: ''
      }
    }
  },
  computed: {
    network () {
      return this.global.network;
    }
  },
  methods: {

    // 显示添加节点面板
    addNodesHandle () {
      this.addNodesVisible = true
      this.$nextTick(() => {
        this.$refs.addNodes.init();
      })
    },
    // 点击导入节点
    importNodeHandle () {
      this.$nextTick(() => {
        this.$refs.sidebarControl.init('2', '导入节点');
      })
    },
    // 点击数据缓存器
    cacheDataHandle () {
      this.cacheDataVisible = true;
      this.$nextTick(() => {
        this.$refs.cacheData.init();
      })
    },
    // 点击添加关系
    addEdgeHandle () {
      this.unbindEvent();// 解绑事件，不然会导致添加关系失效
      this.global.edge_adding = true
      this.network.addEdgeMode();
    },
    // network绑定事件
    bindEvent () {
      // 单击节点查看详情
      this.network.on('click', this.clickEvent);
      // 双击节点展开关系
      this.network.on('doubleClick', this.doubleclickEvent);
    },
    // 解绑事件
    unbindEvent () {
      this.network.off('click', this.clickEvent);
      this.network.off('doubleClick', this.doubleclickEvent);
    },
    /**
     * 单击事件
     */
    clickEvent (params) {
      // 框选时，不执行单击操作
      if (params.event.changedPointers[0].shiftKey === true || this.global.mutilSelectStatus === true) {
        return;
      }

      if (params.nodes.length === 1) {
        // 点击的是节点

        // 查看节点详情
        this.showBasicInfo(params);
        // 刷新定向分析窗体
        // refreshDxAnalysisWind();
      } else if (params.edges.length === 1) {
        // 点击的是连线
        var edge = this.global.edges.get(params.edges[0]);

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
    doubleclickEvent (params) {
      if (params.nodes.length === 1) {
        var curNode = this.global.nodes.get(params.nodes[0]);
        expandNode(this, curNode);
      }
    },
    /**
     * 查看人节点基本信息
     */
    showBasicInfo (params) {
      try {
        let { nodeType, keyword } = this.global.nodes.get(params.nodes[0]);
        if (this.isSideBarOpening()) {
          if (nodeType === 'Person') {
            this.$api.nodeFindDetail({ nodeType, keyword }).then(({ data }) => {
              if (data && data.code === 200) {
                this.basicInfo = data.result;
              }
            })
          }
        }
      } catch (e) {
        console.info(e);
      }
    },
    /**
     *  判断sidebar 是否展开
     */
    isSideBarOpening () {
      return true;
    }
  },
  created () {

  },
  mounted () {
    // 初始化画布
    /* eslint-disable no-new */
    new Workbench('mynetwork', this);
    // 绑定network事件
    this.bindEvent();
  }
}
</script>
<style lang="stylus" scoped>
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
    z-index 10011
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
      margin-top 12px !important
      background url('~@/assets/img/addnode.png') center center no-repeat
      width 31px
      height 27px
      margin 0 auto
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
</style>
