<template>
  <div class="personCenter">
    <div class="coat1">
      <div class="coat2">
        <table border="1" cellspacing="1">
          <tr>
            <td class="tal_tit">登陆账号</td>
            <td colspan="5">admin</td>
          </tr>
          <tr>
            <td class="tal_tit">用户姓名</td>
            <td>管理员</td>
            <td class="tal_tit">警号</td>
            <td>1111111</td>
            <td class="tal_tit">手机</td>
            <td>18000000000</td>
          </tr>
          <tr>
            <td class="tal_tit">身份证号</td>
            <td>55555555555555</td>
            <td class="tal_tit">电子邮箱</td>
            <td colspan="3">####</td>
          </tr>
          <tr>
            <td class="tal_tit">用户组</td>
            <td colspan="5">
              管理员,地市管理员,111,高级权限,搜索分析权限,红名单,游客,区用户组,绵阳平台ip限制
            </td>
          </tr>
          <tr>
            <td class="tal_tit">ip限制</td>
            <td colspan="5"></td>
          </tr>
          <tr>
            <td class="tal_tit">所属机构</td>
            <td colspan="5">四川省公安厅</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'personCenter',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {},
}
</script>

<style lang="stylus" scoped>

.personCenter
  position relative

table
 width 100%
 margin 0 auto
 color #ffffff
 border 5px solid transparent
td
 height: 34px;
 padding 0 15px
 background-color: rgba(44, 239, 255, 0.2)
table .tal_tit
 background-color: rgba(44, 239, 255, 0.4)
 text-align center
</style>
