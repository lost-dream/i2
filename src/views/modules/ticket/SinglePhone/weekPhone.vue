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
      <el-form-item>
        <el-button type="primary" @click="exportExcel">导出</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="continueTable"
      :cell-style="cellStyle"
      border
      style="width: 100%"
    >
      <el-table-column
        label="序号"
        type="index"
        align="center"
        prop="index"
        width="50"
      >
      </el-table-column>
      <el-table-column prop="otherPartyPhone" label="对方号码" align="center">
      </el-table-column>
      <el-table-column prop="sunD" label="星期日" align="center">
      </el-table-column>
      <el-table-column prop="monD" label="星期一" align="center">
      </el-table-column>
      <el-table-column prop="tuesD" label="星期二" align="center">
      </el-table-column>
      <el-table-column prop="wesD" label="星期三" align="center">
      </el-table-column>
      <el-table-column prop="thurD" label="星期四" align="center">
      </el-table-column>
      <el-table-column prop="friD" label="星期五" align="center">
      </el-table-column>
      <el-table-column prop="satD" label="星期六" align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatDate } from '@/utils/dateFormat.js'

export default {
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
      continueTable: [],
      phoneInfo: [],
      phoneInfo2: [],
    }
  },

  mounted() {
    // this.phoneInfo = JSON.parse(sessionStorage.getItem('phoneInfo'))
    this.phoneInfo = JSON.parse(localStorage.getItem('phoneInfo'))
    this.onSubmit()
  },

  methods: {
    onSubmit() {
      if (this.phoneInfo === null) return
      let data = this.phoneInfo
      this.phoneInfo2 = data
      let conData = this.callForm
      console.log('分析查询')
      conData.time != null && this.timeSizer()
      this.continueTable = this.dataSort2(this.phoneInfo2)
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

    // 数据重组
    dataSort2(data) {
      let data1 = {}
      let value1 = []
      data.forEach(ai => {
        let otherPartyPhone = ai.otherPartyPhone
        if (!data1[otherPartyPhone]) {
          value1.push({
            otherPartyPhone: ai.otherPartyPhone,
            sunD: 0,
            monD: 0,
            tuesD: 0,
            wesD: 0,
            thurD: 0,
            friD: 0,
            satD: 0,
          })
          data1[otherPartyPhone] = ai
          for (let j = 0; j < value1.length; j++) {
            let dj = value1[j]
            let otherPartyPhone = ai.otherPartyPhone
            if (dj.otherPartyPhone === otherPartyPhone) {
              dj[this.compareTime2(ai.beginTime)]++
              break
            }
          }
        } else {
          for (let j = 0; j < value1.length; j++) {
            let dj = value1[j]
            let otherPartyPhone = ai.otherPartyPhone
            if (dj.otherPartyPhone === otherPartyPhone) {
              dj[this.compareTime2(ai.beginTime)]++
              break
            }
          }
        }
      })
      return value1
    },

    /**
     * 判断星期几
     */
    compareTime2(date) {
      var d = new Date(date)
      var weekday = new Array(7)
      weekday[0] = 'sunD'
      weekday[1] = 'monD'
      weekday[2] = 'tuesD'
      weekday[3] = 'wesD'
      weekday[4] = 'thurD'
      weekday[5] = 'friD'
      weekday[6] = 'satD'
      return weekday[d.getDay()]
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

    exportExcel() {
      require.ensure([], () => {
        const { exportJsonToExcel } = require('../../../../utils/Export2Excel')
        const tHeader = [
          '序号',
          '对方号码',
          '星期天',
          '星期一',
          '星期二',
          '星期三',
          '星期四',
          '星期五',
          '星期六',
        ]
        const filterVal = [
          'index',
          'otherPartyPhone',
          'sunD',
          'monD',
          'tuesD',
          'wesD',
          'thurD',
          'friD',
          'satD',
        ]
        const list = this.continueTable
        const data = this.formatJson(filterVal, list)
        exportJsonToExcel(tHeader, data, '列表excel')
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
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
    cellStyle(row) {
      console.log('row')
      console.log(row)
      console.log(row.column)
      if (
        (row.column.property === 'sunD' && row.row.sunD > 0) ||
        (row.column.property === 'monD' && row.row.monD > 0) ||
        (row.column.property === 'tuesD' && row.row.tuesD > 0) ||
        (row.column.property === 'wesD' && row.row.wesD > 0) ||
        (row.column.property === 'thurD' && row.row.thurD > 0) ||
        (row.column.property === 'friD' && row.row.friD > 0) ||
        (row.column.property === 'satD' && row.row.satD > 0)
      ) {
        return {
          color: '#e56864',
        }
      } else {
        return {
          background: '',
        }
      }
      // if (row.columnIndex >= 2) {
      //   console.log(row)
      // }
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
