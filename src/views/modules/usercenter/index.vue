<template>
  <div id="user">
    <div class="title">
      <img src="@/assets/img/xiazai.png" alt="" />
      <h1>个人中心</h1>
    </div>
    <div class="dir">
      <router-link to="/personCenter">
        <div class="list" @click="isClick = 1">
          <span class="iconfont icon-gerenzhongxin-zhong"></span>
          <p>个人中心</p>
        </div>
        <div class="clickDef" :class="{ clickOk: isClick === 1 }"></div>
      </router-link>
      <span style="display: inline-block">
        <div class="or-spacer-vertical clearfix">
          <div class="mask"></div>
        </div>
      </span>
      <router-link to="/modifyInfo">
        <div class="list" @click="isClick = 2">
          <span class="iconfont icon-xiugaixinxi"></span>
          <p>修改信息</p>
        </div>
        <div class="clickDef" :class="{ clickOk: isClick === 2 }"></div>
      </router-link>
      <span style="display: inline-block">
        <div class="or-spacer-vertical clearfix">
          <div class="mask"></div>
        </div>
      </span>
      <router-link to="/accountManage">
        <div class="list" @click="isClick = 3">
          <span class="iconfont icon-xiugaimima"></span>
          <p>修改密码</p>
        </div>
        <div class="clickDef" :class="{ clickOk: isClick === 3 }"></div>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'userCenter',
  metaInfo: {
    title: '个人中心',
  },
  components: {},
  props: {},
  data() {
    return {
      isClick: 1,
    }
  },
  computed: {},
  methods: {
    // 刷新路由选择不变
    refCli() {
      let a = this.$route.name
      a === 'personCenter' && (this.isClick = 1)
      a === 'modifyInfo' && (this.isClick = 2)
      a === 'accountManage' && (this.isClick = 3)
    },
  },
  created() {},
  mounted() {
    this.refCli()
  },
}
</script>
<style lang="stylus" scoped>
#user
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
    font-weight: normal;
    color: #ffffff;

.dir
  width: 100%;
  height: 72px;
  border-bottom:1px solid rgba(44, 239, 255, 1)
  background rgba(44, 239, 255, 0.3)
  display flex
  justify-content center
  a
    position: relative;
    display block
    width 120px
    height 100%
    padding 0 20px
    &.router-link-exact-active
      .clickDef
        display: block
      p
        color #e58628
  .clickDef
    display: none;
    position: absolute;
    left: 0;
    bottom -1px
    z-index: 5;
    width: 110px;
    height: 1px;
    background: #114d54;
  .list
    width 100%
    height 100%
    overflow hidden
    position relative
    color #ffffff
    display flex
    flex-direction column
    justify-content center
    align-items center
    .iconfont
      font-size 30px
    p
      margin 0
      line-height 1

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
