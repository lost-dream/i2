<template>
  <div class="mod-ticket ticket-bg">
    <nav class="navbar-fixed-top">
      <div class="header-container">
        <div class="title">
          <img
            style="width: 37px;height: 37px;margin-right:5px;"
            src="../../../assets/img/huadan.png"
            alt="logo"
          />
          <h1>话单分析</h1>
        </div>
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane
            v-for="(item, index) in navList"
            :key="index"
            :name="item.itemName"
          >
            <router-link
              slot="label"
              tag="div"
              class="tab-nav"
              :to="{ name: item.routerName }"
            >
              <header>
                <img :src="item.iconUrl" alt="" />
              </header>
              <span>{{ item.title }}</span>
            </router-link>
          </el-tab-pane>
        </el-tabs>
      </div>
    </nav>
    <div class="box">
      <!--<div class="menubar">-->
      <!--<sidebar>-->
      <!--<sidemenu-item></sidemenu-item>-->
      <!--</sidebar>-->
      <!--</div>-->
      <div class="content ticketInfo">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// import Sidebar from '@/views/common/Sidebar'
// import SidemenuItem from '@/views/common/SidemenuItem'
export default {
  name: 'ticketIndex',
  metaInfo: {
    title: '话单分析',
  },
  components: {
    // Sidebar,
    // SidemenuItem,
  },
  props: {},
  data() {
    return {
      activeName: 'newPhone',
      navList: [
        {
          itemName: 'newPhone',
          routerName: 'newPhone',
          iconUrl: require('./images/xinjian.png'),
          title: '新建话单',
        },
        {
          itemName: 'phoneSearch',
          routerName: 'phoneSearch',
          iconUrl: require('./images/chaxun.png'),
          title: '话单查询',
        },
        {
          itemName: 'singlePhone',
          routerName: 'singlePhone',
          iconUrl: require('./images/danhuadan.png'),
          title: '单话单分析',
        },
        {
          itemName: 'morePhone',
          routerName: 'morePhone',
          iconUrl: require('./images/duohuadan.png'),
          title: '多话单分析',
        },
        {
          itemName: 'allNetwork',
          routerName: 'allNetwork',
          iconUrl: require('./images/quanwangtong.png'),
          title: '全网通查询',
        },
      ],
    }
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {
    this.activeName = this.$route.meta.title
  },
}
</script>
<style lang="stylus" scoped>
.mod-ticket.ticket-bg
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  .is-active span
    color #b7730e
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
  height 100%
.title
  display flex
  justify-content center
  align-items center
  height: 49px;
  &>h1
    margin 0
    color white
    font-size 24px
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
span
  color #ffffff
span:focus, span:hover
  color #e58627

.tab-nav
  height: 100%
  display: flex
  flex-direction column
  justify-content center
  header
    margin 0 auto
    img
      display: block
      width 30px
  span
    line-height 1
    margin-top 10px

.ticketInfo >>>
 .el-table
 .el-table--border td,
 .el-table--border th,
 .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed
  border: 1px solid rgba(0,0,0,0.3)

 .el-table--border::after,
 .el-table--group::after,
 .el-table::before
  background none
 .el-date-editor .el-range-input
  background-color rgba(44, 239, 255, 0)
</style>
