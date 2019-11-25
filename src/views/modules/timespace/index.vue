<template>
  <div class="timespaceindex">
    <div class="title">
      <img src="@/assets/img/timespaceindex.png" alt="" />
      <h1>时空分析</h1>
    </div>
    <!--<div class="menubar">-->
    <!--<sidebar>-->
    <!--<sidemenu-item></sidemenu-item>-->
    <!--</sidebar>-->
    <!--</div>-->
    <router-view />
  </div>
</template>

<script>
// import Sidebar from '@/views/common/Sidebar'
// import SidemenuItem from '@/views/common/SidemenuItem'
export default {
  // components: {
  //   Sidebar,
  //   SidemenuItem,
  // },
  name: 'timeSpaceIndex',
  metaInfo: {
    title: '时空分析',
  },
  props: {},
  data() {
    return {
      isClick: 1,
    }
  },
  computed: {},
  methods: {
    // 刷新路由选择不变
    /* refCli () {
      let a = this.$route.name
      a === 'timespace' ? (this.showCard = false) : (this.showCard = true)
    } */
  },
  created() {},
}
</script>
<style lang="stylus" scoped>
.__icon
  font-size 20px
.timespaceindex
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  overflow hidden
  z-index -1
  width 100%
  height 100%
  content ''
  background url('~@/assets/img/i2bg.png') no-repeat center
  background-size cover
  .title
    width 100%
    height 50px
    background: rgba(44, 239, 255, 0.5)
    display: flex
    justify-content center
    align-items center
    img
      width auto
      height 40px
      margin-right: 10px
    h1
      margin 0
      font-size: 24px;
      font-weight normal
      color: #ffffff;
  .dir
    width: 100%;
    height: 60px;
    border-bottom:1px solid rgba(44, 239, 255, 0.4)
    background rgba(44, 239, 255, 0.3)
    text-align center
    /*margin-bottom 30px*/
    a
      position relative
      top 0
      left 0
      right 0
      bottom 0
      span
        display inline-block
        width 60px
        text-align center
        color #ffffff
        font: nt-size 14px
        line-height: 24px;
    .list, span
      padding 10px 0 0 0
      margin 0 20px
      display inline-block
      width 60px
      text-align center
      color #ffffff
      font: nt-size 14px
      line-height: 24px;
  .or-spacer-vertical
    float right
    margin 5px 0 0 5px
    .mask
      overflow hidden
      width 6px
      height 50px
      &:after
        content ''
        display block
        margin-left -10px
        width 10px
        height 100%
        border-radius 12px / 80px
        box-shadow 0 0 2px #2cefff
  .infoCard
    float right
    height 0
</style>
<style lang="stylus">
.timespaceindex .infoCard
  position absolute
  top 60px
  right 0
</style>
