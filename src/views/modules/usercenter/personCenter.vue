<template>
  <div class="personCenter">
    <div class="coat1">
      <div class="coat2">
        <table border="1" cellspacing="1" v-loading="loading">
          <tr>
            <td class="tal_tit">登陆账号</td>
            <td colspan="5">{{ userInfo.username }}</td>
          </tr>
          <tr>
            <td class="tal_tit">用户姓名</td>
            <td>{{ userInfo.nickName }}</td>
            <td class="tal_tit">警号</td>
            <td>{{ userInfo.siren }}</td>
            <td class="tal_tit">手机</td>
            <td>{{ userInfo.mobile }}</td>
          </tr>
          <tr>
            <td class="tal_tit">身份证号</td>
            <td>{{ userInfo.card }}</td>
            <td class="tal_tit">电子邮箱</td>
            <td colspan="3">{{ userInfo.email }}</td>
          </tr>
          <tr>
            <td class="tal_tit">用户组</td>
            <td colspan="5">
              {{ userInfo.userGroup }}
            </td>
          </tr>
          <tr>
            <td class="tal_tit">ip限制</td>
            <td colspan="5">{{ userInfo.ipAstrict }}</td>
          </tr>
          <tr>
            <td class="tal_tit">所属机构</td>
            <td colspan="5">{{ userInfo.street }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { getUserInfo } from '@/api/userCenter'
export default {
  name: 'personCenter',
  data() {
    return {
      loading: false, // 数据返回前的loading
      userInfo: {},
    }
  },
  mounted() {
    this.loading = true
    getUserInfo({
      accessToken: Cookies.get('ac_token'),
      id: Cookies.get('userId'),
    }).then(({ data }) => {
      console.log(data)
      if (data && data.code === 200) {
        this.loading = false
        this.userInfo = data.data
      } else {
        this.$message.error(data.msg)
      }
    })
  },
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
