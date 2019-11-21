<template>
  <div id="sys">
    <div class="title"><span class="title_a">系统管理</span></div>
    <div class="dir">
      <router-link to="/userManage">
        <div class="list" @click="isClick = 1">
          <span class="icon-zdy-yonghuguanli"></span>
          <span>用户管理</span>
        </div>
        <div class="clickDef" :class="{ clickOk: isClick == 1 }"></div>
      </router-link>
      <span style="display: inline-block">
        <div class="or-spacer-vertical clearfix">
          <div class="mask"></div>
        </div>
      </span>
      <router-link to="/menuManage">
        <div class="list" @click="isClick = 2">
          <span class="icon-zdy-caidan"></span>
          <span>菜单管理</span>
        </div>
        <div class="clickDef" :class="{ clickOk: isClick == 2 }"></div>
      </router-link>
      <span style="display: inline-block">
        <div class="or-spacer-vertical clearfix">
          <div class="mask"></div>
        </div>
      </span>
      <router-link to="/roleManage">
        <div class="list" @click="isClick = 3">
          <span class="icon-zdy-yonghu"></span>
          <span>角色管理</span>
        </div>
        <div class="clickDef" :class="{ clickOk: isClick == 3 }"></div>
      </router-link>
      <span style="display: inline-block">
        <div class="or-spacer-vertical clearfix">
          <div class="mask"></div>
        </div>
      </span>
      <router-link to="/organManage">
        <div class="list" @click="isClick = 4">
          <span class="icon-zdy-jigouguanli"></span>
          <span>机构管理</span>
        </div>
        <div class="clickDef" :class="{ clickOk: isClick == 4 }"></div>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'sysIndex',
  metaInfo: {
    title: '系统管理',
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
      a === 'userManage' && (this.isClick = 1)
      a === 'menuManage' && (this.isClick = 2)
      a === 'roleManage' && (this.isClick = 3)
      a === 'organManage' && (this.isClick = 4)
    },
  },
  created() {},
  mounted() {
    this.refCli()
  },
}
</script>
<style lang="stylus" scoped>
#sys
  position absolute
  top 0
  right 0
  bottom 0
  left 0
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
  height: 72px;
  border-bottom:1px solid rgba(44, 239, 255, 1)
  background rgba(44, 239, 255, 0.3)
  display flex
  justify-content center
  a
    display block
    width 120px
    height 100%
    padding 0 20px
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
    [class^="icon-zdy"]
      font-size 30px
  .clickDef
    display: none;
    position: absolute;
    top: 15px;
    left: -4px;
    z-index: 5;
    width: 110px;
    height: 1px;
    background: #114d54;
  .clickOk
    display: inline-block;


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
