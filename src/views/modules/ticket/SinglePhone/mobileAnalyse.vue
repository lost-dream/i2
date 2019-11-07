<template>
  <div class="container">
    <el-form
      :inline="true"
      :model="callForm"
      id="out-table"
      class="demo-form-inline"
    >
      <el-form-item label="呼叫时间">
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
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="continueTable" border style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        prop="index"
        width="50"
      >
      </el-table-column>
      <el-table-column prop="IMEI" label="手机串号(IMEI)" align="center">
      </el-table-column>
      <el-table-column prop="phoneNumber" label="使用号码" align="center">
      </el-table-column>
      <el-table-column prop="callTimes" label="通话次数" align="center">
      </el-table-column>
      <el-table-column prop="lastTime" label="最后使用时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.lastTime | formatDate }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatDate } from '../../../../utils/dateFormat.js'
export default {
  filters: {
    formatDate(time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
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
      callForm: {
        time: '',
      },
      continueTable: [
        {
          index: '',
          IMEI: '868276009004130',
          phoneNumber: '13111111111',
          callTimes: '124',
          lastTime: '2019-07-31 10:12:11',
        },
      ],
      phone: '',
      phoneInfo: [],
      phoneInfo2: [],
    }
  },
  mounted() {
    // this.phoneInfo = JSON.parse(sessionStorage.getItem('phoneInfo'))
    this.phoneInfo = JSON.parse(localStorage.getItem('phoneInfo'))
    this.continueTable[0].phoneNumber = JSON.parse(
      localStorage.getItem('phone'),
    )
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      let data = this.phoneInfo
      this.phoneInfo2 = data
      let conData = this.callForm
      console.log('分析查询')
      conData.time != null && this.timeSizer()
      this.continueTable[0].callTimes = this.phoneInfo2.length
      console.log(this.timeTotal(this.phoneInfo2))
      this.continueTable[0].lastTime = this.timeTotal(this.phoneInfo2).beginTime
      console.log(this.phoneInfo2)
    },

    // 总时长
    timeTotal(data) {
      let _this = this
      let istime = data.reduce((first, second) => {
        return _this.timeToSec(first.beginTime) >
          _this.timeToSec(second.beginTime)
          ? first
          : second
      })
      return istime
    },

    // 时间转为毫秒
    timeToSec(time) {
      time = formatDate(new Date(time), 'yyyy-MM-dd hh:mm:ss')
      // 转换时间格式，并转换为时间戳
      function tranDate(time) {
        return new Date(time.replace(/-/g, '/')).getTime()
      }
      return tranDate(time)
    },

    // 时间筛选
    timeSizer() {
      let data = this.phoneInfo2
      let time = this.callForm.time
      let dataArr = []
      data.forEach(item => {
        this.compareTime(item.beginTime, time[0], time[1]) && dataArr.push(item)
      })
      this.phoneInfo2 = dataArr
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
.el-input__inner
  background-color rgba(44, 239, 255, 0.3) !important
  border 1px solid rgba(44, 239, 255, 0.4) !important
  color white

.el-form-item__label
  color white !important

.el-table
  background-color rgba(44, 239, 255, 0.3) !important
  color white !important

.el-table th, .el-table tr
  background-color transparent !important

.el-table thead
  color white !important

.el-table tbody tr:hover > td
  background-color rgba(44, 239, 255, 0.4) !important

.el-pagination__total
  color white
</style>
