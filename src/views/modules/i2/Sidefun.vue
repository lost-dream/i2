<template>
  <div class="mod-sidefun">
    <el-tabs
      type="card"
      v-model="activeName"
    >
      <el-tab-pane
        label="基本信息"
        name="0"
      >
        <basic-info :basicInfo='detail'></basic-info>
      </el-tab-pane>
      <el-tab-pane
        label="统计信息"
        name="1"
      >
        <count-info></count-info>
      </el-tab-pane>
      <el-tab-pane
        :label="dynamicTab"
        name="2"
      >
        <component
          v-bind:is="currentTabComponent"
          :ref="currentRef"
        ></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BasicInfo from './BasicInfo'
import CountInfo from './CountInfo'
import DynamicTabDX from './DynamicTabDX'
import ImportNodes from './importNodesWindow'
import Centrality from './CentralityWindow'
export default {
  components: {
    BasicInfo,
    CountInfo,
    DynamicTabDX,
    ImportNodes,
    Centrality
  },
  props: {
    detail: {
      type: Object
    }
  },
  data () {
    return {
      activeName: '0',
      dynamicTab: '',
      currentTabComponent: '',
      currentRef: ''
    }
  },
  computed: {},
  methods: {
    init (name, lable, component) {
      this.activeName = name;
      this.dynamicTab = lable;
      this.currentTabComponent = component || '';
      if (component === 'Centrality') {
        this.currentRef = 'centralityRef';
        this.$nextTick(() => {
          this.$refs.centralityRef.init();
        })
      }
    },
    /**
     * 判断侧边栏是否打开
     */
    isSidebarOpening (num) {

    }
  },
  created () { },
  mounted () { }
}
</script>
<style lang="stylus" scoped>
.mod-sidefun
  >>>.el-tabs__header
    background transparent !important
    .el-tabs__nav
      width 100%
      border none
      .el-tabs__item
        width 33.3%
        padding 0 !important
        background rgba(44, 239, 255, 0.3)
        border-left none
        border-top none
        border-right 2px solid rgba(44, 239, 255, 0.2) !important
        vertical-align middle
  >>>.el-tab-pane
    background transparent !important
    padding-left 0
  >>>.el-tabs__content
    width 100%
    height 100%
    overflow-y scroll
  >>>.tab-title
    background-color rgba(44, 239, 255, 0.15)
    color #C58E64
    height 28px
    line-height 28px
    padding 0 10px
  >>>.tab-content
    position relative
    padding 10px
</style>
