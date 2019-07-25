<template>
  <div class="mod-sidefun">
    <el-tabs type="card">
      <el-tab-pane label="基本信息">
        <basic-info></basic-info>
      </el-tab-pane>
      <el-tab-pane label="统计信息">
        <count-info></count-info>
      </el-tab-pane>
      <el-tab-pane label="数据筛选">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BasicInfo from './BasicInfo'
import CountInfo from './CountInfo'
export default {
  components: {
    BasicInfo,
    CountInfo
  },
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  methods: {},
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
  >>>.el-tab-pane
    background transparent !important
    padding-left 0
  >>>.el-tabs__content
    width 100%
    height 100%
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
