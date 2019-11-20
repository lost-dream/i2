<template>
  <div class="container">
    <div class="bg">
      <div class="title">
        <h3>多话单分析</h3>
      </div>
      <!--<div class="select">
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
          value-key="phone"
          filterable
          multiple
          @change="caseNameChange2"
          placeholder="电话号码"
        >
          <el-option
            v-for="(item, index) in phoneList"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>-->
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
          value-key="phone"
          filterable
          @change="caseNameChange2"
          placeholder="电话号码"
        >
          <el-option
            v-for="(item, index) in phoneList"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div class="inputTag">
          <input-tag
            v-on:remove="remove"
            v-model="callForm.phoneList"
          ></input-tag>
        </div>
      </div>
      <div class="nav">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane name="sameTime"
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/morePhone/sameTime"
                >同时同基站</router-link
              >
            </span>
          </el-tab-pane>
          <el-tab-pane name="assignTime"
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/morePhone/assignTime"
                >指定时间内新出或消失号码</router-link
              >
            </span>
          </el-tab-pane>
          <el-tab-pane name="morePhoneTrail"
            ><span slot="label"
              ><i class="el-icon-view"></i>
              <router-link to="/ticket/morePhone/morePhoneTrail"
                >多手机轨迹</router-link
              >
            </span>
          </el-tab-pane>
          <el-tab-pane name="commonPhone"
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
import InputTag from './comments/inputTag'
export default {
  name: 'morePhoneIndex',
  metaInfo: {
    title: '多话单分析'
  },
  components: {
    InputTag,
  },
  inject: ['reload'],
  data() {
    return {
      activeName: '',
      callForm: {
        phoneId: [],
        phoneList: [],
      },
      cases: [
        /* {
          value: '双十一',
          label: '双十一',
        },
        {
          value: '双十二',
          label: '双十二',
        }, */
      ],
      phoneList: [
        /* {
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
        }, */
      ],
      select: {
        id: '',
        caseName: '',
      },
    }
  },
  mounted() {
    this.activeName = this.$route.name
    this.ticketOneName()
    /* JSON.parse(localStorage.getItem('morPphoneArr')) !== null &&
      (this.phoneList = JSON.parse(localStorage.getItem('morPphoneArr')))
    JSON.parse(localStorage.getItem('moreSelectInfo')) !== null &&
      (this.select = JSON.parse(localStorage.getItem('moreSelectInfo'))) */

    JSON.parse(localStorage.getItem('callForm')) !== null &&
      (this.callForm = JSON.parse(localStorage.getItem('callForm')))
    if (this.callForm.phoneId.length === 0) {
      this.$message('请选择至少两个话单！')
    } else if (this.callForm.phoneId.length === 1) {
      this.$message('请选择至少再选择一个话单！')
    } else {
      this.singlePhoneList()
    }
  },
  methods: {
    caseNameChange1() {
      // localStorage.setItem('moreSelectInfo', JSON.stringify(this.select))
      this.ticketOnePhone()
      // this.singlePhoneList()
    },

    caseNameChange2() {
      // localStorage.setItem('moreSelectInfo', JSON.stringify(this.select))
      // this.singlePhoneList()

      if (this.callForm.phoneId.some(item => item.id === this.select.id.id))
        return this.$message.error('此话单已存在！')
      this.callForm.phoneId.push(this.select.id)
      this.callForm.phoneList.push(
        this.select.id.phone.concat('-', this.select.caseName),
      )
      localStorage.setItem('callForm', JSON.stringify(this.callForm))
      this.select = { id: '', caseName: '' }

      if (this.callForm.phoneId.length >= 2) {
        this.singlePhoneList()
        this.reload()
      } else {
        this.$message('请选择至少两个话单！')
      }
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
            a.value = {}
            a.value.id = item.recordId
            a.value.phone = item.phoneNumber
            a.label = item.phoneNumber
            phoneArr.push(a)
          })
          console.log(phoneArr)
          _this.phoneList = phoneArr
          // _this.phoneList = [...new Set([...phoneArr, ..._this.phoneList])]
          // localStorage.setItem('morPphoneArr', JSON.stringify(_this.phoneList))
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
      let obj = this.callForm.phoneId
      // let obj = id
      // let obj = { id: id }

      this.$api.ticketOneAnalyze2(obj).then(({ data }) => {
        console.log(data)
        if (data.success) {
          // sessionStorage.setItem('phoneInfo', JSON.stringify(data.result))
          localStorage.setItem('morePhone', JSON.stringify(data.result))
          localStorage.setItem('more', JSON.stringify(data.result.phone))
        } else {
          this.$message({
            message: '获取话单失败!',
            type: 'error',
          })
        }
      })
    },
    remove(innerTags, index) {
      console.log(innerTags)
      console.log(index)
      this.callForm.phoneId.splice(index, 1)
      this.callForm.phoneList = JSON.parse(JSON.stringify(innerTags))
      if (this.callForm.phoneId.length >= 2) {
        localStorage.setItem('callForm', JSON.stringify(this.callForm))
        this.singlePhoneList()
        this.reload()
      } else {
        this.$message('请选择至少两个话单！')
      }
    },

    // 选择值变动后调接口获取数据
    caseNameChange() {
      // this.morePhoneList()
      this.singlePhoneList()
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

    handleClick(tab, event) {
      console.log(tab, event)
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
/*>>>.select .el-select:nth-of-type(2)*/
  /*width 501px*/
a
  color #909399
a:focus, a:hover
  color #e58627
.inputTag
  display inline-block
  margin 0 5px
  width 58%
</style>
<style lang="stylus">
.container .el-input__inner
  background-color rgba(44, 239, 255, 0.3) !important
  border 1px solid rgba(44, 239, 255, 0.4) !important
  color #fff
.select .el-tabs__nav-next, .el-tabs__nav-prev
  color white !important
.nav .el-tabs--card>.el-tabs__header .el-tabs__nav
  border none !important
</style>
