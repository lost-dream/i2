<template>
  <div class="mod-ticket ticket-bg">
    <nav class="navbar-fixed-top">
      <div class="header-container">
        <div class="title">
          <h1>话单分析</h1>
        </div>
        <el-tabs type="border-card">
          <el-tab-pane
            ><span slot="label"
              ><i class="el-icon-date"></i>
              <router-link to="/ticket/newPhone">新建话单</router-link>
            </span>
          </el-tab-pane>
          <el-tab-pane
            ><span slot="label"
              ><i class="el-icon-date"></i>
              <router-link to="/ticket/phoneSearch">话单查询</router-link>
            </span></el-tab-pane
          >
          <el-tab-pane
            ><span slot="label"
              ><i class="el-icon-date"></i>
              <router-link to="/ticket/singlePhone">单话单分析</router-link>
            </span></el-tab-pane
          >
          <el-tab-pane
            ><span slot="label"
              ><i class="el-icon-date"></i>
              <router-link to="/ticket/morePhone">多话单分析</router-link>
            </span></el-tab-pane
          >
          <el-tab-pane
            ><span slot="label"
              ><i class="el-icon-date"></i>
              <router-link to="/ticket/allNetwork">全网通查询</router-link>
            </span></el-tab-pane
          >
        </el-tabs>
      </div>
    </nav>
    <div class="box">
      <div class="menubar">
        <sidebar>
          <sidemenu-item></sidemenu-item>
        </sidebar>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/views/common/Sidebar";
import SidemenuItem from "@/views/common/SidemenuItem";
export default {
  components: {
    Sidebar,
    SidemenuItem
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="stylus" scoped>
.mod-ticket.ticket-bg
  position absolute
  top 0
  right 0
  bottom 0
  left 0
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
.header-container .title
  background rgba(44, 239, 255, 0.5)
.el-tabs--border-card
  display flex
  justify-content center
  background rgba(44, 239, 255, 0.3)
  border 2px solid rgba(44, 239, 255, 0.3)
  border-left none
  border-right none
  height 72px
  align-items center
>>>.el-tabs__header
  background rgba(44, 239, 255, 0) !important
  border none !important
>>>.el-tabs__item.is-active
  background rgba(44, 239, 255, 0) !important
>>>.el-tabs__item
  border none !important
.title
  display flex
  justify-content center
  &>h1
    margin 0
    color white
    font-size 33px
.menubar>.sidebar
  left 0
.fun-sidebar >.sidebar
  right 0
  bottom 0
  width 295px
.fun-sidebar .sidebar-inner
  width 320px
.box
  display flex
.content
  position relative
  margin 0 auto
  flex 0 1 auto
.el-form-item__label
  color white
a
  color #909399
a:focus, a:hover
  color #e58627
</style>
