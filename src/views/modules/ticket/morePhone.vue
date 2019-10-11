<template>
  <div class="container">
    <div class="bg">
      <div class="title">
        <h3>多话单分析</h3>
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
          multiple
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
          <el-tab-pane
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/morePhone/sameTime"
                >同时同基站</router-link
              >
            </span>
          </el-tab-pane>
          <el-tab-pane
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/morePhone/assignTime"
                >指定时间内新出或消失号码</router-link
              >
            </span>
          </el-tab-pane>
          <el-tab-pane
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/morePhone/morePhoneTrail"
                >多手机轨迹</router-link
              >
            </span>
          </el-tab-pane>
          <el-tab-pane
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/morePhone/commonPhone"
                >共同联系人分析</router-link
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
        id: '',
        caseName: '',
      },
    }
  },
  mounted() {
    this.ticketOneName()
    this.morePhoneList()
  },
  methods: {
    caseNameChange1() {
      this.ticketOnePhone()
      this.singlePhoneList()
    },

    caseNameChange2() {
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
      let obj = {
        id: this.select.id,
      }
      this.$api.ticketOneAnalyze(obj).then(({ data }) => {
        console.log(data)
        if (data.success) {
          // sessionStorage.setItem('phoneInfo', JSON.stringify(data.result))
          localStorage.setItem('morePhone', JSON.stringify(data.result))
        } else {
          this.$message({
            message: '获取话单失败!',
            type: 'error',
          })
        }
      })
    },
  },

  // 选择值变动后调接口获取数据
  caseNameChange() {
    this.morePhoneList()
  },

  // 获取话单接口
  morePhoneList() {
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
  handleClick(tab, event) {},
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
