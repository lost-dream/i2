<template>
  <div class="relation-mode relation-bg">
    <div class="fly-header header">
      <div class="">
        <a
          href="/"
          class="logo"
        >
          <img
            src="@/assets/img/logo.png"
            alt=""
          >
        </a>
        <span>情报智能分析系统</span>
      </div>
    </div>
    <div class="fly-container">
      <div class="poscenter">
        <div class="lg">关系分析</div>
        <el-input
          placeholder="请输入证件号"
          v-model="input5"
          class="input-with-select"
        >
          <el-select
            v-model="select"
            slot="prepend"
            placeholder="关系模型选择"
          >
            <el-option
              label="餐厅名"
              value="1"
            ></el-option>
            <el-option
              label="订单号"
              value="2"
            ></el-option>
            <el-option
              label="用户电话"
              value="3"
            ></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
          >分析</el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      input5: '',
      select: ''
    }
  },
  computed: {},
  methods: {},
  created () { },
  mounted () { }
}
</script>
<style lang="stylus" scoped>
>>>.el-select .el-input
  width 130px
  color #fff
>>>.el-input-group__append, >>>.el-input-group__prepend
  background-color rgba(44, 239, 255, 0.3) !important
  border 1px solid rgba(44, 239, 255, 0.3)
>>>.el-input__inner
  color #fff
>>>.el-input-group__append
  color #04dafc
.relation-mode.relation-bg
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
.header
  height 60px
  border-bottom 1px solid #404553
  background-color rgba(0, 136, 150, 0.5)
  margin-bottom 20px
.lg
  text-align center
  color #39ccdf
  font-size 24px
  margin-bottom 26px
  letter-spacing 16px
.poscenter
  width 610px
  margin-left auto
  margin-right auto
  position relative
  top 28%
  margin-top -60px
</style>
