<template>
  <div class="container">
    <el-form
      :inline="true"
      :model="callForm"
      ref="callForm"
      class="demo-form-inline"
    >
      <el-form-item label="呼叫时间" prop="time">
        <el-date-picker
          v-model="callForm.time"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addTime">添加</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchData">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="resetForm('callForm')">重置</el-button>
      </el-form-item>
      <!--<input-tag v-on:remove="remove" v-model="callForm.timeList"></input-tag>-->
    </el-form>
    <el-table :data="differentData2" border style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        width="100"
        align="center"
      ></el-table-column>
      <template v-for="(item, index) in tableData">
        <el-table-column
          :prop="item.propName"
          :label="item.label"
          :key="index"
          align="center"
        ></el-table-column>
        <!--<el-table-column
          :prop="item.propName"
          :label="item.label"
          :key="index"
          align="center"
          :width="item.width"
        ></el-table-column>-->
      </template>
    </el-table>
  </div>
</template>

<script>
// import InputTag from '../comments/inputTag'
import { formatDate } from '../../../../utils/dateFormat.js'
export default {
  components: {
    // InputTag,
  },
  filters: {
    formatDate(time) {
      var date = new Date(time)
      return formatDate(date, 'hh:mm:ss ')
    },
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
      arr: [],
      callForm: {
        time: '',
        timeList: [],
      },
      differentPeriod: [
        {
          otherPartyPhone: '',
          periorTimes: '',
          location: '',
        },
      ],
      tableData: [
        {
          propName: 'otherPartyPhone',
          label: '对方号码',
          fixed: true,
          width: '120',
        },
        {
          propName: 'periorTimes',
          label: '几个时段',
          fixed: true,
          width: '80',
        },
        { propName: 'location', label: '号码属地', fixed: true, width: '100' },
      ],
      differentData: [],
      differentData2: [],
    }
  },

  mounted() {
    // this.differentData = JSON.parse(sessionStorage.getItem('phoneInfo'))
    this.differentData = JSON.parse(localStorage.getItem('phoneInfo'))
    this.searchData()
  },

  methods: {
    searchData() {
      let data = this.differentData
      this.differentData2 = data
      let conData = this.callForm
      console.log('分析查询')
      conData.time != null && this.timeSizer()
      this.differentData2 = this.dataSort2(this.differentData2)
      console.log(this.differentData2)
      // this.tableDataHandle()
    },

    // 数据重组
    dataSort2(data) {
      let data1 = {}
      let value1 = []
      data.forEach(ai => {
        let otherPartyPhone = ai.otherPartyPhone
        if (!data1[otherPartyPhone]) {
          value1.push({
            otherPartyPhone: otherPartyPhone,
            beginTime: [ai],
            periorTimes: 1,
            location: ai.location,
          })
          data1[otherPartyPhone] = ai
        } else {
          for (let j = 0; j < value1.length; j++) {
            let dj = value1[j]
            let otherPartyPhone = ai.otherPartyPhone
            if (dj.otherPartyPhone === otherPartyPhone) {
              dj.beginTime.push(ai)
              dj.periorTimes = this.differTotal(dj.beginTime)
              break
            }
          }
        }
      })
      return value1
    },

    // 时段计算
    differTotal(data) {
      let arr = []
      data.forEach(item => {
        let hours = formatDate(new Date(item.beginTime), 'h')
        arr.indexOf(hours) === -1 && arr.push(hours)
      })
      return arr.length
    },
    // 时间筛选
    timeSizer() {
      let data = this.differentData2
      let time = this.callForm.time
      let dataArr = []
      data.forEach(item => {
        this.compareTime(item.beginTime, time[0], time[1]) && dataArr.push(item)
      })
      this.differentData2 = dataArr
    },
    /**
     * 判断是否在时间段内
     * converseTime 要判断的时间 stime 开始时间 etime 结束时间
     */
    compareTime(changeTime, stime, etime) {
      changeTime = formatDate(new Date(changeTime), 'yyyy-MM-dd hh:mm:ss')
      stime = formatDate(new Date(stime), 'yyyy-MM-dd hh:mm:ss')
      etime = formatDate(new Date(etime), 'yyyy-MM-dd hh:mm:ss')

      // 转换时间格式，并转换为时间戳
      function tranDate(time) {
        return new Date(time.replace(/-/g, '/')).getTime()
      }

      // 开始时间
      let startTime = tranDate(stime)
      // 结束时间
      let endTime = tranDate(etime)
      let nowTime = tranDate(changeTime)
      // 如果当前时间处于时间段内，返回true，否则返回false
      if (nowTime < startTime || nowTime > endTime) {
        return false
      }
      return true
    },
    addTime() {
      console.log('xzh', this.callForm)
      if (this.callForm.time) {
        let newTime = this.timeChange(this.callForm.time)
        let obj = newTime
          .map(function(item, index) {
            return item
          })
          .join('至')
        this.arr.push(obj)
        this.callForm.timeList.push(obj)
      } else {
        this.$message({
          message: '请输入需要查询的时间范围',
          type: 'warning',
        })
      }
    },
    message(message, type) {
      this.$message({
        message: `${message}`,
        type: `${type}`,
      })
    },
    tableDataHandle() {
      this.tableDataReset()
      this.tableData = this.tableData.concat(
        this.arr.map(function(item, index) {
          return {
            propName: `perior+${item.index}`,
            label: `${item}`,
            width: '180',
          }
        }),
      )
    },
    tableDataReset() {
      this.tableData = this.tableData.slice(0, 3)
    },
    arrReset() {
      this.arr = []
      this.callForm.timeList = []
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.tableDataReset()
      this.arrReset()
    },
    remove(innerTags) {
      this.arr = innerTags.map(function(item, index) {
        return { time: item }
      })
    },
    timeChange(time) {
      var newTime = time.map(function(item) {
        var d = new Date(item)
        var newItem =
          d.getFullYear() +
          '-' +
          (d.getMonth() + 1) +
          '-' +
          d.getDate() +
          ' ' +
          d.getHours() +
          ':' +
          d.getMinutes() +
          ':' +
          d.getSeconds()
        return newItem
      })
      return newTime
    },
  },
}
</script>
<style lang="stylus" scoped>
.container
  width 1000px
  margin 0 auto
  padding 0px
</style>
<style lang="stylus">
.container
  .el-input__inner
    color white !important
  .el-table--border
    border 1px solid rgba(0, 0, 0, 0.3) !important
  .el-table th, .el-table tr, .el-table--border td
    background-color transparent !important
    border 1px solid rgba(0, 0, 0, 0.3) !important
  .el-table--border::after, .el-table--group::after
    width 0px !important
  .el-table::before
    height 0px !important
  .el-button--primary
    color #FFF !important
    background-color rgba(130, 200, 75, 0.5) !important
    border-color rgba(130, 200, 75, 0.5) !important
    border-radius 2px !important
  .el-button--danger
    color #FFF !important
    background-color rgba(223, 108, 97, 0.5) !important
    border-color rgba(223, 108, 97, 0.5) !important
    border-radius 2px !important
  .el-textarea__inner
    background-color rgba(44, 239, 255, 0.3) !important
    border 1px solid rgba(44, 239, 255, 0.4) !important
    color #fff !important
  .el-table tbody tr:hover>td
    background-color rgba(44, 239, 255, 0.3) !important
</style>
