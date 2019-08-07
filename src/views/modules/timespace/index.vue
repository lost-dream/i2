<template>
  <div class="timespaceindex">
    <div class="title"><span class="title_a">时空分析</span></div>
    <div class="dir">
      <div class="list" @click="isClick = 1">
        <!--<el-button class="el-icon-circle-check" type="text">全部</el-button>-->
        <span style="font-size: 20px;" class="el-icon-circle-check"></span><span>全部</span>

      </div>
      <span style="display: inline-block">
      <div class="or-spacer-vertical clearfix">
          <div class="mask"></div>
        </div>
    </span>
      <div class="list" @click="isClick = 1">
        <!--<el-button class="el-icon-user" type="text">飞机</el-button>-->
        <span style="font-size: 20px;" class="el-icon-user"></span><span>飞机</span>

      </div>
      <span style="display: inline-block">
      <div class="or-spacer-vertical clearfix">
          <div class="mask"></div>
        </div>
    </span>
      <div class="list" @click="isClick = 1">
        <!--<el-button class="el-icon-user" type="text">火车</el-button>-->
        <span style="font-size: 20px;" class="el-icon-user"></span><span>火车</span>

      </div>
      <span style="display: inline-block">
      <div class="or-spacer-vertical clearfix">
          <div class="mask"></div>
        </div>
    </span>
      <div class="list" @click="isClick = 1">
        <!--<el-button class="el-icon-user" type="text">旅馆</el-button>-->
        <span style="font-size: 20px;" class="el-icon-user"></span><span>旅馆</span>
      </div>
      <span style="display: inline-block">
      <div class="or-spacer-vertical clearfix">
          <div class="mask"></div>
        </div>
    </span>
      <div class="list" @click="isClick = 1">
      <!--<el-button class="el-icon-monitor" type="text">网吧</el-button>-->
      <span style="font-size: 20px;" class="el-icon-user"></span><span>网吧</span>
      </div>
      <span style="display: inline-block">
      <div class="or-spacer-vertical clearfix">
          <div class="mask"></div>
        </div>
    </span>
      <router-link to="/timespacelist">
        <div class="list" @click="isClick = 3">
          <span style="font-size: 20px;" class="el-icon-search"></span><span>查询</span>
        </div>
        <div class="clickDef" :class="{'clickOk':isClick==3}"></div>
      </router-link>
    </div>
    <div class="menubar">
      <sidebar>
        <sidemenu-item></sidemenu-item>
      </sidebar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Sidebar from '@/views/common/Sidebar'
  import SidemenuItem from '@/views/common/SidemenuItem'
export default {
  components: {
    Sidebar,
    SidemenuItem
  },
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style lang="stylus" scoped>
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
    text-align center

  .title_a
    z-index 2
    opacity 1
    font-family: HYk2gj;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 55px;
    letter-spacing: 0px;
    color: #ffffff;
  .dir
    width: 100%;
    height: 60px;
    border-bottom:1px solid rgba(44, 239, 255, 0.4)
    background rgba(44, 239, 255, 0.3)
    text-align center
  /*margin-bottom 30px*/
  .dir a
    position relative
    top 0
    left 0
    right 0
    bottom 0

  .dir .list
    padding 10px 0 0 0
    margin 0 20px

  .dir a span,
  .dir .list,
  .dir .list span
    display inline-block
    width 60px
    text-align center
    color #ffffff
    font-size 14px
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

</style>
