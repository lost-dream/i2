<template>
  <div class="container">
    <div class="bg">
      <div class="title">
        <h3>单话单分析</h3>
      </div>
      <div class="select">
        <el-select
          v-model="select.caseName"
          filterable
          @change="caseNameChange"
          placeholder="案件名称"
        >
          <el-option
            v-for="item in cases"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="select.phone"
          filterable
          @change="caseNameChange"
          placeholder="电话号码"
        >
          <el-option
            v-for="item in phoneList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="nav">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/singlePhone/soonLate"
                >最早最晚分析</router-link
              >
            </span>
          </el-tab-pane>
          <el-tab-pane
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/singlePhone/periodAll"
                >分时段分析</router-link
              >
            </span>
          </el-tab-pane>
          <el-tab-pane
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/singlePhone/continuePeriod"
                >连续时段分析</router-link
              >
            </span>
          </el-tab-pane>
          <el-tab-pane
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/singlePhone/differentPeriod"
                >不同时段分析</router-link
              >
            </span>
          </el-tab-pane>
          <el-tab-pane
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/singlePhone/callAnalyse"
                >通话分析</router-link
              >
            </span>
          </el-tab-pane>
          <el-tab-pane
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/singlePhone/callDetailAnalyse"
                >通话详情分析</router-link
              >
            </span>
          </el-tab-pane>
          <el-tab-pane
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/singlePhone/phoneHomeLocation"
                >号码归属分析</router-link
              >
            </span>
          </el-tab-pane>
          <el-tab-pane
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/singlePhone/phoneTravel"
                >手机轨迹</router-link
              >
            </span>
          </el-tab-pane>
          <el-tab-pane
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/newPhone">移动设备分析</router-link>
            </span>
          </el-tab-pane>
          <el-tab-pane
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/newPhone">一周号码频次</router-link>
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
      ],
      select: {
        phone: '',
        caseName: '',
      },
    }
  },
  mounted() {
    this.singlePhoneList()
  },
  methods: {
    handleClick(tab, event) {},

    caseNameChange() {
      this.singlePhoneList()
    },
    // 获取话单列表
    singlePhoneList() {
      var _this = this
      let obj = {
        caseName: this.select.caseName,
        phone: this.select.phone,
      }
      this.$api.ticketOneAnalyze(obj).then(({ data }) => {
        console.log(data)
        if (data.success) {
          _this.$message({
            message: '获取话单成功！!',
            type: 'success',
          })
        } else {
          this.$message({
            message: '获取话单失败!',
            type: 'error',
          })
        }
      })
    },
  },
}
</script>
<style lang="stylus" scoped>
.container
  width 1200px
  margin 0 auto
  padding 20px
  background-color rgba(44, 239, 255, 0.1)
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
