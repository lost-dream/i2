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
          @change="caseNameChange1"
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
          v-model="select.id"
          filterable
          @change="caseNameChange2"
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
          <el-tab-pane name="soonLate"
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/singlePhone/soonLate"
                >最早最晚分析</router-link
              >
              <!--<router-link :to="{name:'soonLate',query:{modeInfo: JSON.stringify(item)}}">最早最晚分析</router-link>-->
            </span>
          </el-tab-pane>
          <el-tab-pane name="periodAll"
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/singlePhone/periodAll"
                >分时段分析</router-link
              >
            </span>
          </el-tab-pane>
          <el-tab-pane name="continuePeriod"
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/singlePhone/continuePeriod"
                >连续时段分析</router-link
              >
            </span>
          </el-tab-pane>
          <el-tab-pane name="differentPeriod"
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/singlePhone/differentPeriod"
                >不同时段分析</router-link
              >
            </span>
          </el-tab-pane>
          <el-tab-pane name="callAnalyse"
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/singlePhone/callAnalyse"
                >通话分析</router-link
              >
            </span>
          </el-tab-pane>
          <el-tab-pane name="callDetailAnalyse"
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/singlePhone/callDetailAnalyse"
                >通话详情分析</router-link
              >
            </span>
          </el-tab-pane>
          <el-tab-pane name="phoneHomeLocation"
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/singlePhone/phoneHomeLocation"
                >号码归属分析</router-link
              >
            </span>
          </el-tab-pane>
          <el-tab-pane name="phoneTravel"
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/singlePhone/phoneTravel"
                >手机轨迹</router-link
              >
            </span>
          </el-tab-pane>
          <el-tab-pane name="mobileAnalyse"
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/singlePhone/mobileAnalyse"
                >移动设备分析</router-link
              >
            </span>
          </el-tab-pane>
          <el-tab-pane name="weekPhone"
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/singlePhone/weekPhone"
                >一周号码频次</router-link
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
  naem: 'singlePhoneIndex',
  metaInfo: {
    title: '单话单分析',
  },
  inject: ['reload'],
  data() {
    return {
      activeName: 'soonLate',
      cases: [],
      phoneList: [],
      select: {
        id: '',
        caseName: '',
      },
    }
  },
  mounted() {
    this.activeName = this.$route.name
    this.ticketOneName()
    JSON.parse(localStorage.getItem('phoneArr')) !== null &&
      (this.phoneList = JSON.parse(localStorage.getItem('phoneArr')))
    JSON.parse(localStorage.getItem('selectInfo')) !== null &&
      (this.select = JSON.parse(localStorage.getItem('selectInfo')))
  },
  methods: {
    handleClick(tab, event) {},

    caseNameChange1() {
      this.ticketOnePhone()
    },

    caseNameChange2() {
      localStorage.setItem('selectInfo', JSON.stringify(this.select))
      this.singlePhoneList()
    },

    // 获取话单案件名称
    ticketOneName() {
      var _this = this
      this.$api.ticketOneName().then(({ data }) => {
        console.log(data)
        if (data.success) {
          let casesArr = []
          let caseList = data.result
          caseList.forEach(item => {
            let a = {}
            a.value = item.caseName
            a.label = item.caseName
            casesArr.push(a)
          })
          _this.cases = casesArr
          // console.log(_this.cases)
        } else {
          this.$message({
            message: '获取话单案件名称失败!',
            type: 'error',
          })
        }
      })
    },

    // 获取话单案件电话
    ticketOnePhone() {
      var _this = this
      let obj = this.select.caseName
      this.$api.ticketOnePhone(obj).then(({ data }) => {
        console.log(data)
        if (data.success) {
          let phoneArr = []
          let phoneList = data.result
          phoneList.forEach(item => {
            let a = {}
            a.value = item.recordId
            a.label = item.phoneNumber
            phoneArr.push(a)
          })
          _this.phoneList = phoneArr
          _this.select.id = _this.phoneList[0].value
          _this.caseNameChange2()
          localStorage.setItem('phoneArr', JSON.stringify(phoneArr))
          console.log(_this.phoneList)
        } else {
          this.$message({
            message: '获取话单案件电话失败!',
            type: 'error',
          })
        }
      })
    },

    // 获取话单列表
    singlePhoneList() {
      var _this = this
      var data = this.phoneList.filter(function(item) {
        return item.value === _this.select.id
      })
      console.log(data)
      let obj = {
        id: this.select.id,
        phone: data[0].label,
      }
      this.$api.ticketOneAnalyze(obj).then(({ data }) => {
        console.log(data)
        if (data.success) {
          // sessionStorage.setItem('phoneInfo', JSON.stringify(data.result))
          localStorage.setItem('phoneInfo', JSON.stringify(data.result.list))
          localStorage.setItem('phone', JSON.stringify(data.result.phone))
          _this.reload()
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
  .is-active a
    color #b7730e
.bg
  background-color rgba(44, 239, 255, 0.1)
  padding 1px 40px 40px
.container .title
  color white
  font-size 24px
.select
  margin 10px 0
  margin-left 20px
a
  color #909399
a:focus, a:hover
  color #e58627

>>>.el-range-input
  color: #fff
  background: transparent
>>>.el-range-separator
  color: #fff
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
