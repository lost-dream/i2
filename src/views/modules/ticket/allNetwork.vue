<template>
  <div class="container">
    <div class="bg">
      <div class="title">
        <h3>全网通查询</h3>
      </div>
      <div class="nav">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane name="allNetPhoneSearch"
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/allNetwork/allNetPhoneSearch"
                >电话查询</router-link
              >
            </span>
          </el-tab-pane>
          <el-tab-pane name="IMEISearch"
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/allNetwork/IMEISearch"
                >IMEI查询</router-link
              >
            </span>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="mainContent">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'allNetworkIndex',
  metaInfo: {
    title: '全网通查询',
  },
  mounted() {
    this.activeName = this.$route.name
  },
  data() {
    return {
      activeName: 'first',
      cases: [
        {
          value: '双十一',
          label: '双十一',
        },
        {
          value: '双十二',
          label: '双十二',
        },
      ],
      phoneList: [
        {
          value: '13111111111',
          label: '13111111111',
        },
        {
          value: '15111111111',
          label: '15111111111',
        },
        {
          value: '13111111112',
          label: '13111111112',
        },
        {
          value: '15111111112',
          label: '15111111112',
        },
      ],
      select: {
        phone: '',
        caseName: '',
      },
    }
  },
  methods: {
    handleClick(tab, event) {},
  },
}
</script>
<style lang="stylus" scoped>
.container
  width 1200px
  margin 0 auto
  padding 20px
  background-color rgba(44, 239, 255, 0.1)
  .is-active a
    color #b7730e
.bg
  background-color rgba(44, 239, 255, 0.1)
  padding 40px
.container .title
  position absolute
  top -10px
  color white
  font-size 24px
.select
  margin 10px 0
  margin-left 20px
>>>.select .el-select:nth-of-type(2)
  width 501px
a
  color #909399
a:focus, a:hover
  color #e58627
</style>
<style lang="stylus">
.select .el-input__inner
  background-color rgba(44, 239, 255, 0.3) !important
  border 1px solid rgba(44, 239, 255, 0.4) !important
  color #fff
.select .el-tabs__nav-next, .el-tabs__nav-prev
  color white !important
.nav .el-tabs--card>.el-tabs__header .el-tabs__nav
  border none !important
</style>
