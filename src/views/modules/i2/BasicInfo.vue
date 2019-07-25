<template>
  <div class="mod-basic">
    <div class="title tab-title">
      <span>个人信息</span>
      <span class="fly-icon"></span>
    </div>
    <div class="basic-content tab-content">
      <div class="basic-info">
        <p><label class="key-info">证件号码</label>37162619940324861X</p>
        <p><label class="key-info">姓名</label>薛芬乐</p>
        <p><label class="key-info">民族</label>汉族</p>
        <p><label class="key-info">性别</label>女</p>
        <p><label class="key-info">出生日期</label>1994 年 03 月 24 日</p>
        <p><label class="key-info">联系电话</label>18504547677</p>
        <p><label class="key-info">现居地</label>浙江省杭州市临安市南极星6幢8单元915室</p>

      </div>
      <div class="image-info"> <img src=""></div>
    </div>
    <div class="title tab-title">
      <span>个人标签</span>
      <span class="fly-icon"></span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
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
.mod-basic
.basic-content
  .basic-info
    color #fff
    min-height 220px
    p
      font-size 14px
      color #fdfdfd
      .key-info
        margin-right 15px
</style>
